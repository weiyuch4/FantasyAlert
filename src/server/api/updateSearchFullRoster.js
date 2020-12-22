const getAllPlayers = require('./roster');

const updateSearchFullRoster = async () => {
  const allPlayerData = await getAllPlayers();
  const allTeams = Object.keys(allPlayerData);

  let arr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allTeams.length; i++) {
    const teamName = allTeams[i];
    const teamRoster = allPlayerData[teamName];

    const newTeamRoster = teamRoster.map((player) => {
      const temp = {};
      temp[Object.keys(player)[0]] = [teamName, Object.values(player)[0]];
      return temp;
    });

    arr = arr.concat(newTeamRoster);
  }

  return arr;
};

module.exports = updateSearchFullRoster;
