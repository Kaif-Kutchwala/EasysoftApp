const createSport = async (
  key,
  group,
  title,
  description,
  active,
  has_outrights,
  pool
) => {
  try {
    const newSport = await pool.query(
      "INSERT INTO sports (sports_key,sports_group,title,description,active,has_outrights) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [key, group, title, description, active, has_outrights]
    ).catch((e) => console.log(e.message));
    return newSport;
  } catch (error) {
    console.log(error.message);
  }
};

const createInPlay = async (
  id,
  sport_key,
  commence_time,
  home_team,
  away_team,
  bookmakers,
  pool
) => {
  try {
    const newFixture = await pool.query(
      "INSERT INTO inplay (id,sport_key,commence_time,home_team,away_Team,bookmakers) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [id, sport_key, commence_time, home_team, away_team, bookmakers]
    ).catch((e) => console.log(e.message));
    return newFixture;
  } catch (error) {
    console.log(error.message);
  }
};

const createNotInPlay = async (
  id,
  sport_key,
  commence_time,
  home_team,
  away_team,
  bookmakers,
  pool
) => {
  try {
    const newFixture = await pool.query(
      "INSERT INTO notinplay (id,sport_key,commence_time,home_team,away_Team,bookmakers) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [id, sport_key, commence_time, home_team, away_team, bookmakers]
    ).catch((e) => console.log(e.message));
    return newFixture;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteSports = async (pool) => {
  try {
    const response = await pool.query("TRUNCATE TABLE sports").catch((e) => console.log(e.message));
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteInPlay = async (pool) => {
  try {
    const response = await pool.query("TRUNCATE TABLE inplay").catch((e) => console.log(e.message));
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
const deleteNotInPlay = async (pool) => {
  try {
    const response = await pool.query("TRUNCATE TABLE notinplay").catch((e) => console.log(e.message));
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

exports.createSport = createSport;
exports.createInPlay = createInPlay;
exports.createNotInPlay = createNotInPlay;
exports.deleteSports = deleteSports;
exports.deleteInPlay = deleteInPlay;
exports.deleteNotInPlay = deleteNotInPlay;
