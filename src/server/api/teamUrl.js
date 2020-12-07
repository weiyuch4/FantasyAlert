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

  const teamNames = [],
        teamUrl = {},
        string = 'https://www.espn.com/';
        leftSubstring = 'href=\"',
        rightSubstring = '\">Roster</a>';

  $('.mt3', '.layout__column').find('div > section > div').each(function (i) {
    $(this).find('a > h2').each(function(index, element) {
      const teamName = $(this).html();
      teamNames.push(teamName);
    })
    $(this).find('div > span').each(function(index, element) {
      if ($(this).find('a').html() === 'Roster') {
        const left = $(this).html().indexOf(leftSubstring) + 7,
              right = $(this).html().indexOf(rightSubstring),
              urlHtml = string.concat($(this).html().slice(left, right));
        teamUrl[teamNames[i]] = urlHtml;
      }
    })
  });

  return teamUrl;
};

module.exports = getTeamsUrl;