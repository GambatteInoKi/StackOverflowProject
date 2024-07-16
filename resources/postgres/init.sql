
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


CREATE TABLE users (
    id Serial PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    is_admin boolean NOT NULL
);