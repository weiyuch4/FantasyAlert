const getResults = require('./gameScraper');

const getAllGameId = async () => {
  const $ = await getResults();

  const allInfo = [];
  const games = {};
  const gamesEnd = {};

  $('.responsive-table-wrap', '#sched-container').find('table > tbody').filter(function (i) {
    if (i === 0) {
      $(this).find('tr').each(function (index, element) {
        const teams = [];
        let status = '';
        $(this).find('td > a > abbr').each(function () {
          teams.push($(this).attr('title'));
        });
        $(this).find('td > div > a > abbr').each(function () {
          teams.push($(this).attr('title'));
        });

        let gameHtml = $(this).find('td[data-behavior=date_time] > a').attr('href');

        if (gameHtml === null || gameHtml === undefined) {
          gameHtml = $(this).find('td[class=live] > a').attr('href');
        }

        if (gameHtml === null || gameHtml === undefined) {
          gameHtml = $(this).find('a[name="&lpos=nba:schedule:score"]').attr('href');
          status = 'end';
        }

        if (gameHtml === null || gameHtml === undefined) {
          status = 'no-game';
        }

        if (status === '') {
          const gameId = gameHtml.split('=')[1];
          games[gameId] = teams;
        } else if (status === 'end') {
          const gameId = gameHtml.split('=')[1];
          gamesEnd[gameId] = teams;
        }
      });
    }
    if (i === 1) {
      $(this).find('tr').each(function (index, element) {
        const teams = [];
        $(this).find('td > a > abbr').each(function (index) {
          teams.push($(this).attr('title'));
        });
        $(this).find('td > div > a > abbr').each(function (index) {
          teams.push($(this).attr('title'));
        });

        const gameHtml = $(this).find('a[name="&lpos=nba:schedule:score"]').attr('href');

        if (gameHtml !== null && gameHtml !== undefined) {
          const gameId = gameHtml.split('=')[1];
          gamesEnd[gameId] = teams;
        }
      });
    }
  });
  allInfo.push(games);
  allInfo.push(gamesEnd);

  return allInfo;
};

module.exports = getAllGameId;
