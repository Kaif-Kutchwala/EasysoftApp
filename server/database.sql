CREATE DATABASE easysoft;

CREATE TABLE sports(
    sport_id SERIAL PRIMARY KEY,
    sports_key VARCHAR(150),
    sports_group VARCHAR(150),
    title VARCHAR(100),
    description VARCHAR(255),
    active BOOLEAN,
    has_outrights BOOLEAN
);

CREATE TABLE upcoming(
    id VARCHAR(255) PRIMARY KEY,
    sport_key VARCHAR(150),
    commence_time TIMESTAMP,
    home_team VARCHAR(255),
    away_Team VARCHAR(255),
    bookmakers JSON []
);

