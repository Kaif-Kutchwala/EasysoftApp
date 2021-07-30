CREATE DATABASE easysoft;

CREATE TABLE sports(
    sports_key VARCHAR(150) PRIMARY KEY,
    sports_group VARCHAR(150),
    title VARCHAR(100),
    description VARCHAR(255),
    active BOOLEAN,
    has_outrights BOOLEAN
);

CREATE TABLE inplay(
    id VARCHAR(255) PRIMARY KEY,
    sport_key VARCHAR(150),
    commence_time TIMESTAMP,
    home_team VARCHAR(255),
    away_Team VARCHAR(255),
    bookmakers JSON []
);

CREATE TABLE notinplay(
    id VARCHAR(255) PRIMARY KEY,
    sport_key VARCHAR(150),
    commence_time TIMESTAMP,
    home_team VARCHAR(255),
    away_Team VARCHAR(255),
    bookmakers JSON []
);