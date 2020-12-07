const getResults = require('./gameScraper');

const getAllGameId = async () => {
  const $ = await getResults();

  const games = [],
        leftSubstring = 'Id=',
        rightSubstring = '\"></a';

  $('.responsive-table-wrap', '#sched-container').find('table > tbody').filter(function (i) {
   if (i === 0) {
    $(this).find('tr').each(function(index, element) {
      const gameHtml = $(this).children('td[data-behavior=date_time]').html();
      const left = gameHtml.indexOf(leftSubstring) + 3,
            right = gameHtml.indexOf(rightSubstring),
            gameId = gameHtml.slice(left, right);
      games.push(gameId);
    })
   }
  });

  return games;
};

module.exports = getAllGameId;