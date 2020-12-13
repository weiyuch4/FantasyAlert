const axios = require('axios');
const cheerio = require('cheerio');

const getUrl = (gameId) => {
  const siteUrl = `https://www.espn.com/nba/boxscore?gameId=${gameId}`;
  return siteUrl;
};

const fetchData = async (gameId) => {
  try {
      const result = await axios.get(getUrl(gameId));
      return result.data;
  } catch (err) {
      console.error(err);
  }
};

const getStarter = async (gameId) => {
  try {
      const data = await fetchData(gameId);

      const $ = cheerio.load(data);
      
      return $;
  } catch (err) {
      console.error(err);
  }
};

module.exports = getStarter;