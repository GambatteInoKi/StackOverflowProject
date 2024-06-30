import unittest
from unittest.mock import patch
from flask_testing import TestCase

from stackoverflow import app


class FlaskAppTests(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        return app

    @patch('requests.get')
    def test_home(self, mock_get):
        tester = app.test_client(self)
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
        tester = app.test_client(self)
        response = tester.get('/search?keyword=example&tag=python')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]['title'], 'Example Question')

    @patch('stackoverflow.conn')
    @patch('stackoverflow.cursor')
    def test_save_question(self, mock_cursor, mock_conn):
        mock_conn.cursor.return_value = mock_cursor
        tester = app.test_client(self)
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

    @patch('stackoverflow.conn')
    @patch('stackoverflow.cursor')
    def test_view_saved_questions(self, mock_cursor, mock_conn):
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchall.return_value = [
            (1, 'Example Question', 'https://stackoverflow.com/questions/123456/example-question', 10,
             '2024-06-26T12:00:00Z', 'flask,python', 100, 'example_user')
        ]
        tester = app.test_client(self)
        response = tester.get('/saved')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]['title'], 'Example Question')

    @patch('stackoverflow.conn')
    @patch('stackoverflow.cursor')
    def test_delete_question(self, mock_cursor, mock_conn):
        mock_conn.cursor.return_value = mock_cursor
        tester = app.test_client(self)
        response = tester.delete('/delete/1')
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)
        self.assertEqual(response.json, {'message': 'Question deleted successfully'})


if __name__ == '__main__':
    unittest.main()
