const axios = require('axios');
const cheerio = require('cheerio');

const gamesToday = () => {
  const todayUrl = 'https://www.espn.com/nba/schedule';
  return todayUrl;
};

const fetchData = async () => {
  try {
      const result = await axios.get(gamesToday());
      return result.data;
  } catch (err) {
      console.error(err);
  }
};

const getResults = async () => {
  try {
      const data = await fetchData();

      const $ = cheerio.load(data);
      
      return $;
  } catch (err) {
      console.error(err);
  }
};

module.exports = getResults;