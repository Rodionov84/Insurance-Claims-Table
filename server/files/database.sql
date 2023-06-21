CREATE DATABASE pernins;

CREATE TABLE uploading_file(
id SERIAL PRIMARY KEY,
data_time TIMESTAMP DEFAULT now(),
statements_json JSONB DEFAULT null
);
