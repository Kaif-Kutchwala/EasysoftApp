const schedule = require('node-schedule');
const apiKey = process.env.EASYSOFTAPIKEY;
console.log(apiKey);
const axios = require("axios");

const inPlayDelay = 30;

const getSports = async () => {
    try {
      const sportsData = await axios.get(
        `https://api.the-odds-api.com/v3/sports/?apiKey=${apiKey}`
      );
      return sportsData.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getInPlay = async () => {
    try {
      const fixturesData = await axios.get(
        `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=uk&markets=h2h&apiKey=${apiKey}`
      );
      return fixturesData.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getNotInPlay = async () => {
    try {
      const fixturesData = await axios.get(
        `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=uk&markets=h2h&apiKey=${apiKey}`
      );
      return fixturesData.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateInPlayOdds = (timeDelay) => {
    //delay in seconds is converted to minutes and seconds
    const delayMinutes = Math.floor(timeDelay / 60) === 0 ? "" : `/${Math.floor(timeDelay / 60)}`;
    const delaySeconds = timeDelay - (delayMinutes * 60) === 0 ? "" : `/${timeDelay - (delayMinutes * 60)}`;
    console.log(delayMinutes, delaySeconds);
    const updateInPlay = schedule.scheduleJob(`*${delaySeconds} *${delayMinutes} * * * *`, async () => {
      try { 
          const inPlay = await getNotInPlay();
          const deleteResponse = await axios.delete(
              "http://localhost:5000/api/inplay"
          );
          const niresponse = await axios.post("http://localhost:5000/api/inplay", {
              data: JSON.stringify(inPlay),
          });
          console.log("Updated in-play odds.")
      } catch (error) {
          console.log(error.message)
      }
  });
  };


const startup = async () => {
    try {
      const sports = await getSports();
      const sresponse = await axios.post("http://localhost:5000/api/sports", {
        data: JSON.stringify(sports),
      });
      const inPlay = await getInPlay();
      const iresponse = await axios.post("http://localhost:5000/api/inplay", {
        data: JSON.stringify(inPlay),
      });
      const NotInPlay = await getNotInPlay();
      const niresponse = await axios.post("http://localhost:5000/api/notinplay", {
        data: JSON.stringify(NotInPlay),
      });
      return {status: "success"};
    } catch (error) {
      console.log(error.message);
    }
  };

const main = async () => {
  const response = await startup();

  const updateNotInPlay = schedule.scheduleJob(' 0 */1 * * *', async () => {
      try {
          const notInPlay = await getNotInPlay();
          const deleteResponse = await axios.delete(
              "http://localhost:5000/api/notinplay"
          );
          const niresponse = await axios.post("http://localhost:5000/api/notinplay", {
              data: JSON.stringify(notInPlay),
          });
      } catch (error) {
          console.log(error.message)
      }
  });

  await updateInPlayOdds(10); //current delay is 10 seconds
};

main();