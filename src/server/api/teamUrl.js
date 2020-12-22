const axios = require('axios');
const cheerio = require('cheerio');

const getTeams = () => {
  const teamsUrl = 'https://www.espn.com/nba/teams';
  return teamsUrl;
};

const fetchTeamsData = async () => {
  try {
    const result = await axios.get(getTeams());
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

const getTeamsResults = async () => {
  try {
    const data = await fetchTeamsData();

    const $ = cheerio.load(data);

    return $;
  } catch (err) {
    console.error(err);
  }
};

const getTeamsUrl = async () => {
  const $ = await getTeamsResults();

  const teamNames = [];
  const teamInfo = {};
  const string = 'https://www.espn.com/';
  const leftSubstring = 'href=\"';
  const rightSubstring = '\">Roster</a>';

  $('.mt3', '.layout__column').find('div > section').each(function (i) {
    $(this).find('div > a > h2').each(function(index, element) {
      const teamName = $(this).html();
      teamNames.push(teamName);
    });
    $(this).find('div > div > span').each(function(index, element) {
      if ($(this).find('a').html() === 'Roster') {
        const left = $(this).html().indexOf(leftSubstring) + 7;
        const right = $(this).html().indexOf(rightSubstring);
        const urlHtml = string.concat($(this).html().slice(left, right));
        teamInfo[teamNames[i]] = [urlHtml, `./logo/${i}.png`];
      }
    });
  });

  return teamInfo;
};

module.exports = getTeamsUrl;
