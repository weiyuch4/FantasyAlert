/* eslint-disable func-names */
const getResults = require('./scraper');
const getAllGameId = require('./game');
const getStarter = require('./starter');

const getPlayerStatus = async (player) => {
  let num = 1;
  const latest = {};
  let gameId = 'no-game';

  const playerName = Object.keys(player)[0];
  const playerTeam = Object.values(player)[0];

  const allGames = await getAllGameId();
  const games = allGames[0];
  const gamesEnd = allGames[1];

  const onGameId = Object.keys(games);
  const onTeams = Object.values(games);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < onTeams.length; i++) {
    if (onTeams[i].includes(playerTeam)) {
      gameId = onGameId[i];
      i = onTeams.length;
    }
  }

  const endTeams = Object.values(gamesEnd);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < endTeams.length; i++) {
    if (endTeams[i].includes(playerTeam)) {
      latest.status = 'off';
      latest.quarter = 'Game Ended';
      return latest;
    }
  }

  if (gameId === 'no-game') {
    latest.status = 'no-game';
    latest.quarter = 'No Game Today';
    return latest;
  }

  if (gameId === 'null') {
    return 'error';
  }

  const $ = await getResults(gameId);
  const startersHtml = await getStarter(gameId);
  const starters = [];

  do {
    // eslint-disable-next-line no-loop-func
    $(`#gp-quarter-${num}`).find('div > table > tbody').each(function () {
      $(this).find('tr').each(function () {
        const on = $(this).children(`td:contains("${playerName} enters the game")`);
        if (on.html()) {
          latest.detail = on.html();
          latest.status = 'on';
        }
        const off = $(this).children(`td:contains("enters the game for ${playerName}")`);
        if (off.html()) {
          latest.detail = off.html();
          latest.status = 'off';
        }
        if (on.html() || off.html()) {
          latest.time = $(this).children('.time-stamp').html();
          latest.score = $(this).children('.combined-score').html();
          if (num === 1) {
            latest.quarter = '1st Quarter - ';
          } else if (num === 2) {
            latest.quarter = '2nd Quarter - ';
          } else if (num === 3) {
            latest.quarter = '3rd Quarter - ';
          } else {
            latest.quarter = '4th Quarter - ';
          }
        }
      });
    });
    // eslint-disable-next-line no-plusplus
    num++;
  } while (num < 5);

  /*
  startersHtml('.mod-data').find('tbody').each(function(index) {
    console.log(startersHtml(this).find('tr > td > a > span[class=abbr]').text())
  });
  */

  startersHtml('.mod-data').each(function (index) {
    startersHtml(this).find('tbody > tr > td > a').each(function (i) {
      if (i < 5 && startersHtml(this).children('span[class=abbr]').text() !== '') {
        starters.push(startersHtml(this).children('span[class=abbr]').text());
      }
    });
  });

  const words = playerName.split(' ');
  let abbrName = `${words[0][0]}.`;
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < words.length; i++) {
    abbrName = `${abbrName} ${words[i]}`;
  }

  if (Object.keys(latest).length === 0 && starters.includes(abbrName)) {
    latest.status = 'on';
    latest.quarter = '1st Quarter - ';
    latest.time = '12:00';
    return latest;
  }

  if (Object.keys(latest).length === 0) {
    latest.status = 'not-started';
    latest.quarter = '';
    return latest;
  }

  return latest;
};

const getAllPlayerStatus = async (followedPlayers) => {
  const players = {};
  let num = 0;

  if (Object.keys(followedPlayers).length === 0) {
    return players;
  }

  const playerNames = Object.keys(followedPlayers);
  const playerInfo = Object.values(followedPlayers);
  const playerTeams = playerInfo.map((player) => player[0]);
  const playerIcons = playerInfo.map((player) => player[1]);

  do {
    const player = {};
    player[playerNames[num]] = playerTeams[num];
    // eslint-disable-next-line no-await-in-loop
    const playerStatus = await getPlayerStatus(player);
    if (playerStatus === 'error') {
      players.handle = 'error';
    } else {
      playerStatus.icon = playerIcons[num];
      players[playerNames[num]] = playerStatus;
    }
    // eslint-disable-next-line no-plusplus
    num++;
  } while (num < playerNames.length);

  return players;
};

module.exports = getAllPlayerStatus;
