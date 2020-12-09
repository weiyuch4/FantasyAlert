const getResults = require('./gameScraper');

const getAllGameId = async () => {
  const $ = await getResults();

  const games = {},
        leftSubstring = 'Id=',
        rightSubstring = '\"></a';

  $('.responsive-table-wrap', '#sched-container').find('table > tbody').filter(function (i) {
   if (i === 0) {
    $(this).find('tr').each(function(index, element) {
      const teams = [];
      $(this).find('td > a > abbr').each(function(index) {
        teams.push($(this).attr('title'));
      })
      $(this).find('td > div > a > abbr').each(function(index) {
        teams.push($(this).attr('title'));
      })

      const gameHtml = $(this).children('td[data-behavior=date_time]').html();
      const left = gameHtml.indexOf(leftSubstring) + 3,
            right = gameHtml.indexOf(rightSubstring),
            gameId = gameHtml.slice(left, right);
      games[gameId] = teams;
    })
   }
  });

  return games;
};

module.exports = getAllGameId;