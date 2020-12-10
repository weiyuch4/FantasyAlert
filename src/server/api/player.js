const getResults = require('./scraper');
const getAllGameId = require('./game');

const getPlayerStatus = async (player) => {

  let num = 1;
      latest = {},
      gameId = 'no-game';

  const playerName = Object.keys(player)[0],
        playerTeam = Object.values(player)[0];

  const games = await getAllGameId();

  const allGameId = Object.keys(games),
        allTeams = Object.values(games);

  for (let i = 0; i < allTeams.length; i++) {
    if (allTeams[i].includes(playerTeam)) {
      gameId = allGameId[i];
      i = allTeams.length;
    }
  }

  if (gameId === 'no-game') {
    latest['status'] = 'no-game';
    latest['quarter'] = 'No Game Today';
    return latest;
  }


  const $ = await getResults(gameId);

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
              latest['quarter'] = '1st Quarter - ';
            } else if (num === 2) {
              latest['quarter'] = '2nd Quarter - ';
            } else if (num === 3) {
              latest['quarter'] = '3rd Quarter - ';
            } else {
              latest['quarter'] = '4th Quarter - ';
            }
          }
      })
    });
    num++;
  } while (num < 5);

  if (Object.keys(latest).length === 0) {
    latest['status'] = 'not-started';
    latest['quarter'] = 'Game Starting Soon';
    return latest;
  }

  return latest;
};

const getAllPlayerStatus = async (followedPlayers) => {

  const players = {};
  var num = 0;

  if (Object.keys(followedPlayers).length === 0) {
    return players;
  }

  const playerNames = Object.keys(followedPlayers),
        playerInfo = Object.values(followedPlayers),
        playerTeams = playerInfo.map(player => player[0]);
        playerIcons = playerInfo.map(player => player[1]);

  do {
    const player = {};
    player[playerNames[num]] = playerTeams[num];
    const playerStatus = await getPlayerStatus(player);

    // playerStatus === {} if game not started
    if (playerStatus !== {}) {
      playerStatus['icon'] = playerIcons[num];
      players[playerNames[num]] = playerStatus;
    }
    num++;
  } while (num < playerNames.length);

  return players;
};

module.exports = getAllPlayerStatus;