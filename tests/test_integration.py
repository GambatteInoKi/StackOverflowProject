import os
import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify, request
from flask_testing import TestCase
import requests
import psycopg2
from dotenv import load_dotenv

# Import the app and methods from your __init__.py
from stackoverflow import app, search_questions

# Load environment variables
load_dotenv()


class IntegrationTests(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        return app

    def setUp(self):
        self.conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS saved_questions (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                link VARCHAR(255) NOT NULL,
                score INTEGER NOT NULL,
                creation_date TIMESTAMP NOT NULL,
                tags VARCHAR(255),
                view_count INTEGER,
                owner VARCHAR(100)
            );
        ''')
        self.conn.commit()

    def tearDown(self):
        self.cursor.execute('DROP TABLE saved_questions')
        self.conn.commit()
        self.cursor.close()
        self.conn.close()

    def test_home(self):
        tester = self.client
        response = tester.get('/')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(response.json, {"message": "Welcome to Stack Over Flow App!"})

    @patch('requests.get')
    def test_search(self, mock_get):
        mock_get.return_value.json.return_value = {
            'items': [
                {'title': 'Example Question', 'link': 'https://stackoverflow.com/questions/123456/example-question',
                 'score': 10}
            ]
        }
        tester = self.client
        response = tester.get('/search?keyword=example&tag=python')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]['title'], 'Example Question')

    def test_save_question(self):
        tester = self.client
        response = tester.post('/save', json={
            'title': 'Example Question',
            'link': 'https://stackoverflow.com/questions/123456/example-question',
            'score': 10,
            'creation_date': '2024-06-26T12:00:00Z',
            'tags': ['flask', 'python'],
            'view_count': 100,
            'owner': 'example_user'
        })
        statuscode = response.status_code
        self.assertEqual(statuscode, 201)
        self.assertEqual(response.json, {'message': 'Question saved successfully'})

        # Verify in database
        self.cursor.execute('SELECT * FROM saved_questions WHERE title=%s', ('Example Question',))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Example Question')

    def test_view_saved_questions(self):
        # Insert a test question
        self.cursor.execute('''
            INSERT INTO saved_questions (title, link, score, creation_date, tags, view_count, owner)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (
        'Example Question', 'https://stackoverflow.com/questions/123456/example-question', 10, '2024-06-26T12:00:00Z',
        'flask,python', 100, 'example_user'))
        self.conn.commit()

        tester = self.client
        response = tester.get('/saved')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]['title'], 'Example Question')

    def test_delete_question(self):
        # Insert a test question
        self.cursor.execute('''
            INSERT INTO saved_questions (title, link, score, creation_date, tags, view_count, owner)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (
        'Example Question', 'https://stackoverflow.com/questions/123456/example-question', 10, '2024-06-26T12:00:00Z',
        'flask,python', 100, 'example_user'))
        self.conn.commit()

        # Get the ID of the inserted question
        self.cursor.execute('SELECT id FROM saved_questions WHERE title=%s', ('Example Question',))
        result = self.cursor.fetchone()
        question_id = result[0]

        tester = self.client
        response = tester.delete(f'/delete/{question_id}')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(response.json, {'message': 'Question deleted successfully'})

        # Verify deletion
        self.cursor.execute('SELECT * FROM saved_questions WHERE id=%s', (question_id,))
        result = self.cursor.fetchone()
        self.assertIsNone(result)


if __name__ == '__main__':
    unittest.main()
