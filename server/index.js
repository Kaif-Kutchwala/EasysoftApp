const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const apiKey = process.argv[2];

app.use(cors());
app.use(express.json());

//add sport
app.post("/api/sports", async (req, res) => {
    try {
        const {
            key,
            group,
            title,
            description,
            active,
            has_outrights
        } = req.body;

        const newSport = await pool.query("INSERT INTO sports (sports_key,sports_group,title,description,active,has_outrights) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", 
        [key, group, title, description, active, has_outrights]);

        res.json(newSport.rows[0]);

    } catch (error) {
        console.log(error);
    }
})

//add upcoming fixture
app.post("/api/upcoming", async (req, res) => {
    try {
        const {
            id,
            sport_key,
            commence_time,
            home_team,
            away_team,
            bookmakers
        } = req.body;

        const newSport = await pool.query("INSERT INTO upcoming (id,sport_key,commence_time,home_team,away_Team,bookmakers) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", 
        [id,sport_key,commence_time,home_team,away_team,bookmakers]);

        res.json(newSport.rows[0]);

    } catch (error) {
        console.log(error);
    }
})

// get all sports
app.get("/api/sports", async (req,res) => {
    try {
        const sport = await pool.query("SELECT * FROM sports");
        res.json(sport.rows);
    } catch (error) {
        console.log(error);
    }
});

//get specific sport
app.get("/api/sports/:sports_key", async (req,res) => {
    try {
        const { sports_key } = req.params;
        const sport = await pool.query("SELECT * FROM sports WHERE sports_key = $1",
        [sports_key]);

        res.json(sport.rows);
    } catch (error) {
        console.log(error);
    }
});

//get all upcoming fixtures
app.get("/api/upcoming", async (req,res) => {
    try {
        const sport = await pool.query("SELECT * FROM upcoming");
        res.json(sport.rows);
    } catch (error) {
        console.log(error);
    }
});

//get specific upcoming fixture
app.get("/api/upcoming/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const fixture = await pool.query("SELECT * FROM upcoming WHERE id = $1",
        [id]);

        res.json(fixture.rows);
    } catch (error) {
        console.log(error);
    }
});


//update sport
app.put("/api/sports/:sports_key", async (req, res) => {
    try {
        const { sports_key } = req.params;
        const {
            key,
            group,
            title,
            description,
            active,
            has_outrights
        } = req.body;
        const updatedSport = await pool.query("UPDATE sports SET sports_key = $1,sports_group = $2,title = $3,description = $4, active = $5, has_outrights = $6 WHERE sports_key = $7",
        [key, group, title, description, active, has_outrights, sports_key]);
        
        res.send("Updated.")
    } catch (error) {
        console.log(error);
    }
});

//update fixture
app.put("/api/upcoming/:fixture_id", async (req, res) => {
    try {
        const { fixture_id } = req.params;
        const {
            id,
            sport_key,
            commence_time,
            home_team,
            away_team,
            bookmakers
        } = req.body;
        const updatedFixture = await pool.query("UPDATE upcoming SET id = $1,sport_key = $2,commence_time = $3,home_team = $4, away_Team = $5, bookmakers = $6 WHERE id = $7",
        [id, sport_key, commence_time, home_team, away_team, bookmakers, fixture_id]);
        
        res.send("Updated.")
    } catch (error) {
        console.log(error);
    }
});

app.use
app.listen(5000, () => {
    console.log("server has started on port 5000");
})