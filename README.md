# StackOverflowProject

First off, use the .env_example for yopur reference and set up a local Postgres Database, and create a table called saved_questions with this command:
CREATE TABLE saved_questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    tags VARCHAR(255),
    view_count INTEGER,
    owner VARCHAR(100)
);

![Screenshot 2024-06-26 at 12 41 25 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/3e2c2812-185a-4288-b330-1c1c5db2bfa4)

Run the Flask application.

Please import flask_api_postman_collection.json in your Postman Desktop app to view the Postman Collection and hit the API Endpoints. 

![Screenshot 2024-06-26 at 12 35 50 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/f59512e4-aef0-4ec5-8e2a-71cdcc12da25)

Here's the documentaion of the collection: 

![Screenshot 2024-06-26 at 12 53 32 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/cb08d445-e7f0-4033-b26d-17a9c45a6df3)
![Screenshot 2024-06-26 at 12 54 08 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/d98a61e7-71fe-4fd9-b815-86c15bfb4d89)
