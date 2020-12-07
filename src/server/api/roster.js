const axios = require('axios');
const cheerio = require('cheerio');
const { head } = require('./app');
const getTeamsUrl = require('./teamUrl');

const fetchTeamData = async (teamUrl) => {
  try {
      const result = await axios.get(teamUrl);
      return result.data;
  } catch (err) {
      console.error(err);
  }
};

const getTeamResults = async (teamUrl) => {
  try {
      const data = await fetchTeamData(teamUrl);
      const $ = cheerio.load(data);
      return $;
  } catch (err) {
      console.error(err);
  }
};

const getAllPlayers = async () => {

  const data = await getTeamsUrl(),
        teamsUrl = Object.values(data),
        teamsNames = Object.keys(data);
        
  let fullRoster = {};

  for (let i = 0; i < teamsUrl.length; i++) {
    
    const $ = await getTeamResults(teamsUrl[i]);

    fullRoster[teamsNames[i]] = [];
          
    $('.flex').find('table > tbody > tr > td > div > a > div > figure > div').each(function (index) {
      const playerHeadshot = $(this).children('img[data-mptype=image]').attr('alt');
      const playerName = $(this).children('img[data-mptype=image]').attr('title');
      let player = {};
      player[playerName] = playerHeadshot;
      if (playerHeadshot && playerName) {
        fullRoster[teamsNames[i]].push(player);
      }
    })
  }
  
  return fullRoster;
};

module.exports = getAllPlayers;