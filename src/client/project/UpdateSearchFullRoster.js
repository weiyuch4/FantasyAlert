const updateSearchFullRoster = () => {

  const rnfs = require('react-native-fs');

  const allPlayerData = require('./full-roster.json');
  const allTeams = Object.keys(allPlayerData);

  const arr = [];

  for (let i = 0; i < allTeams.length; i++) {
    const teamName = allTeams[i],
      teamRoster = allPlayerData[teamName];

    const newTeamRoster = teamRoster.map(player => {
      const temp = {};
      temp[Object.keys(player)[0]] = [teamName, Object.values(player)[0]];
      return temp;
    });

    arr = arr.concat(newTeamRoster);
  }

  rnfs.writeFile(rnfs.DocumentDirectoryPath + '/search-full-roster-test.json', JSON.stringify(arr));

};

export default updateSearchFullRoster;