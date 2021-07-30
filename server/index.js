const express = require("express");
const app = express();
const cors = require("cors");
const {
    createSport,
    createNotInPlay,
    createInPlay,
    deleteSports,
    deleteNotInPlay,
    deleteInPlay,
  } = require("./databaseHandler");
const { Pool } = require("pg");
const [user, password, host, database] = process.env.POOL_PARAMS.split(" ");
const pool = new Pool({
  user: user,
  password:password,
  host: host,
  port: 5432,
  database: database
});

app.use(cors());
app.use(express.json());

//add sport
app.post("/api/sports", async (req, res) => {
  try {
    JSON.parse(req.body.data).forEach(async (row) => {
      const { key, group, title, description, active, has_outrights } = row;
      const newSport = await createSport(
        key,
        group,
        title,
        description,
        active,
        has_outrights,
        pool
      ).catch((e) => console.log(e.message));
      res.status(200).send([{
        status: "success",
        newSport: newSport.rows[0],
      }]);
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed" });
  }
});

//add inplay fixture
app.post("/api/inplay", async (req, res) => {
  try {
    JSON.parse(req.body.data).forEach(async (row) => {
      const { id, sport_key, commence_time, home_team, away_team, bookmakers } =
        row;
      const newFixture = await createInPlay(
        id,
        sport_key,
        commence_time,
        home_team,
        away_team,
        bookmakers,
        pool
      ).catch((e) => console.log(e.message));
      res.status(200).send([{
        status: "success",
        newFixture: newFixture.rows[0],
      }]);
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed" });
  }
});

//add not in play fixture
app.post("/api/notinplay", async (req, res) => {
  try {
    JSON.parse(req.body.data).forEach(async (row) => {
      const { id, sport_key, commence_time, home_team, away_team, bookmakers } =
        row;
      const newFixture = await createNotInPlay(
        id,
        sport_key,
        commence_time,
        home_team,
        away_team,
        bookmakers,
        pool
      ).catch((e) => console.log(e.message));
      res.status(200).send([{
        status: "success",
        newFixture: newFixture.rows[0],
      }]);
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed" });
  }
});

//delete in-play
app.delete("/api/inplay/", async (req, res) => {
  try {
    const response = await deleteInPlay(pool).catch((e) => console.log(e.message));
    res.status(200).send([
      {status: "success",
      response: response
    }]);
  } catch (error) {
    console.log(error);
  }
});

//delete not in-play
app.delete("/api/notinplay/", async (req, res) => {
  try {
    const response = await deleteNotInPlay(pool).catch((e) => console.log(e.message));
    res.status(200).send([
      {status: "success",
      response: response
    }]);
  } catch (error) {
    console.log(error);
  }
});

//delete sports
app.delete("/api/sports/", async (req, res) => {
  try {
    const response = await deleteSports(pool).catch((e) => console.log(e.message));
    res.status(200).send([
      {status: "success",
      response: response
    }]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, async () => {
  try {
    console.log("Server started on port 5000");
    console.log("Provided Database Connection String: " + process.env.POOL_PARAMS);
    console.log("Provided API Key: " + process.env.EASYSOFTAPIKEY );
    
  } catch (error) {
    console.log(error.message);
  }
});