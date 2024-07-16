import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import requests
import psycopg2

app = Flask(__name__)

load_dotenv()

DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

API_URL = "https://api.stackexchange.com/2.3/search/advanced"
SITE = "stackoverflow"

# Set up the PostgreSQL database connection
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
cursor = conn.cursor()


def search_questions(keyword, tag):
    params = {
        'order': 'desc',
        'sort': 'activity',
        'q': keyword,
        'tagged': tag,
        'site': SITE
    }
    response = requests.get(API_URL, params=params)
    questions = response.json().get('items', [])
    return questions


@app.route('/')
def home():
    return jsonify({"message": "Welcome to Stack Over Flow App!"})


@app.route('/search', methods=['GET'])
def search():
    keyword = request.args.get('keyword')
    tag = request.args.get('tag')
    questions = search_questions(keyword, tag)
    return jsonify(questions)


@app.route('/save', methods=['POST'])
def save_question():
    question_data = request.json
    title = question_data.get('title')
    link = question_data.get('link')
    score = question_data.get('score')
    creation_date = question_data.get('creation_date')
    tags = ','.join(question_data.get('tags', []))
    view_count = question_data.get('view_count')
    owner = question_data.get('owner')

    cursor.execute('''
        INSERT INTO saved_questions (title, link, score, creation_date, tags, view_count, owner)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', (title, link, score, creation_date, tags, view_count, owner))
    conn.commit()
    return jsonify({'message': 'Question saved successfully'}), 201


@app.route('/saved', methods=['GET'])
def view_saved_questions():
    cursor.execute('SELECT * FROM saved_questions')
    saved_questions = cursor.fetchall()
    saved_questions_list = [
        {'id': row[0], 'title': row[1], 'link': row[2], 'score': row[3], 'creation_date': row[4], 'tags': row[5], 'view_count': row[6], 'owner': row[7]}
        for row in saved_questions
    ]
    return jsonify(saved_questions_list)


@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_question(id):
    cursor.execute('DELETE FROM saved_questions WHERE id = %s', (id,))
    conn.commit()
    return jsonify({'message': 'Question deleted successfully'})


@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.json
    username = user_data.get('username')
    password = user_data.get('password')
    is_admin = False

    cursor.execute('''
        INSERT INTO users (username, password, is_admin)
        VALUES (%s, %s, %s)
    ''', (username, password, is_admin))
    conn.commit()
    return jsonify({'message': f'User {username} is created successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    user_data = request.json
    username = user_data.get('username')
    password = user_data.get('password')

    cursor.execute('''
        SELECT username, is_admin
        FROM users
        WHERE username = %s and password = %s
    ''', (username, password))

    user_info = cursor.fetchall()
    if len(user_info) == 0:
        return jsonify({'message': f'Please check your username/password combo'}), 404
    else:
        username = user_info[0][0]
        is_admin = user_info[0][1]
        return jsonify({'username': username, 'is_admin': is_admin})


@app.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    cursor.execute('DELETE FROM users WHERE id = %s', (id,))
    conn.commit()
    return jsonify({'message': 'User deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)