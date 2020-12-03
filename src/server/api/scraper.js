const axios = require('axios');

const getUrl = (gameId) => {
  const siteUrl = `https://secure.espn.com/core/nba/playbyplay?gameId=${gameId}&xhr=1&render=true&device=desktop&country=ca&lang=en&region=us&site=espn&edition-host=espn.com&site-type=full`;
  return siteUrl;
}

const fetchData = async () => {
  try {
      const result = await axios.get(getUrl('401248438'));
      return result.data;
  } catch (err) {
      console.error(err);
  }
};

const getResults = async () => {
  try {
      const $ = await fetchData(getUrl('401248438'));
      return $;
  } catch (err) {
      console.error(err);
  }
}

module.exports = getResults;

// console.log(`Site HTML: ${$.html()}\n\n`);