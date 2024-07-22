# StackOverflowProject

## Docker Approach

1. Copy `.env_example` to `.env` and change the values properly.
    - Adjust the values to match the one in `resources/pgadmin4/pgpass` and `resources/pgadmin4/servers.json` for pgadmin4 to work prpoerly.
2. Just run `sudo docker compose up --build`
3. Open your browser and enter "http://localhost:4200" and enjoy!


## Legacy Note

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

The above is only an example:

What you need to do is that you have to change .env_example to .env which sets up the python environment since the constants are used in the init file.

Once you do that, you must also have docker in your machine and run docker compose up ==build in order to start the container with images that are necessary to the project.

The code will automatically create the tables as specified within init.sql which has a similar table as shown in the example above.

Make sure that you have the proper credentials in .env: if it does not work, replace the .env variables with the following:
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=postgres
DB_PORT=5432

![Screenshot 2024-06-26 at 12 41 25 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/3e2c2812-185a-4288-b330-1c1c5db2bfa4)

Run the Flask application.

Please import flask_api_postman_collection.json in your Postman Desktop app to view the Postman Collection and hit the API Endpoints. 

![Screenshot 2024-06-26 at 12 35 50 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/f59512e4-aef0-4ec5-8e2a-71cdcc12da25)

Here's the documentaion of the collection: 

![Screenshot 2024-06-26 at 12 53 32 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/cb08d445-e7f0-4033-b26d-17a9c45a6df3)
![Screenshot 2024-06-26 at 12 54 08 PM](https://github.com/hshastri/StackOverflowProject/assets/35407439/d98a61e7-71fe-4fd9-b815-86c15bfb4d89)


You can run the SPA project by first installing node at https://nodejs.org/en

After, make sure to install angular CLI with command prompt that can use node:
npm install -g @angular/cli

After, make sure you use the project packages with:
npm i 

This installs NgPrime which is a component library mostly for table usage.

Make sure you're in the right directory before running:
ng serve
