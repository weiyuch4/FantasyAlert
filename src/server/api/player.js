const getResults = require('./scraper');

const getPlayerStatus = async (playerName) => {
  const $ = await getResults('401248438');

  let num = 1;
      latest = {};

  do {
    $(`#gp-quarter-${num}`).find('div > table > tbody').each(function (index, element) {
      $(this).find('tr').each(function() {
          const on = $(this).children(`td:contains("${playerName} enters the game")`);
          if (on.html()) {
            latest['detail'] = on.html();
            latest['status'] = 'on';
          }
          const off = $(this).children(`td:contains("enters the game for ${playerName}")`);
          if (off.html()) {
            latest['detail'] = off.html();
            latest['status'] = 'off';
          }
          if (on.html() || off.html()) {
            latest['time'] = $(this).children('.time-stamp').html();
            latest['score'] = $(this).children('.combined-score').html();
            if (num === 1) {
              latest['quarter'] = '1st Quarter';
            } else if (num === 2) {
              latest['quarter'] = '2nd Quarter';
            } else if (num === 3) {
              latest['quarter'] = '3rd Quarter';
            } else {
              latest['quarter'] = '4th Quarter';
            }
          }
      })
    });
    num++;
  } while (num < 5);

  return latest;
};

const getAllPlayerStatus = async (allPlayers) => {

  const players = {};
  var num = 0;

  do {
    const playerStatus = await getPlayerStatus(allPlayers[num]);
    players[allPlayers[num]] = playerStatus;
    num++;
  } while (num < allPlayers.length);

  return players;
};

module.exports = getAllPlayerStatus;