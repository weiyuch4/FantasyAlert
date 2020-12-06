const axios = require('axios');
const cheerio = require('cheerio');

const getUrl = (gameId) => {
  const siteUrl = `https://secure.espn.com/core/nba/playbyplay?gameId=${gameId}&xhr=1&render=true&device=desktop&country=ca&lang=en&region=us&site=espn&edition-host=espn.com&site-type=full`;
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

const getResults = async (gameId) => {
  try {
      const data = await fetchData(gameId);
      const htmlResults = data.content.html;

      const $ = cheerio.load(htmlResults);
      
      return $;
  } catch (err) {
      console.error(err);
  }
};

module.exports = getResults;