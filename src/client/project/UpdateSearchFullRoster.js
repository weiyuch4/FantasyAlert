let fs = require('fs');

const allPlayerData = require('./search-full-roster.json'),
	allTeams = Object.keys(allPlayerData);

let arr = [];

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

fs.writeFile('search-full-roster1.json', JSON.stringify(arr), function (err) {
	if (err) throw err;
});
