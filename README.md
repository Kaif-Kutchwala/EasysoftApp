# Easysoft Test Kaif Kutchwala

# What was used?
- PostgreSQL
- Node JS

# How to run?

Pull the master branch.
Run `npm install`

Open 3 terminals.

- Terminal 1: This is where you can create your PostgreSQL database. The commands used to create the database can be found in `database.sql`
- Terminal 2: This is where you will run `index.js`. You must first pass in the connection string in the following format `$ENV:POOL_PARAMS="user password host database_name"`
- Terminal 3: This is where you will run `app.js`. YOu must first pass in the API KEY in the following format: `$$ENV:EASYSOFTAPIKEY="api_key"`.

In terminal 2 run `nodemon index`.
In terminal 3 run `node app.js`.

On temrinal 2 you will initially see your connection string, please reveiw this to ensure it is correct.
On terminal 3 you will initially see your api key, please reveiw this to ensure it is correct.

#Important Note
Please ensure all tables in the database are empty before executing the commands.

