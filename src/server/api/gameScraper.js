const axios = require('axios');
const cheerio = require('cheerio');

const getTodayDate = () => {
  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  today = year + month + day;

  return today;
};

const gamesToday = () => {
  const todayDate = getTodayDate();
  const todayUrl = `https://www.espn.com/nba/schedule/_/date/${todayDate}`;
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
