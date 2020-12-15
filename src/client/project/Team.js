import { useEffect, useState } from 'react';
//import { API_URL } from 'react-native-dotenv';

const getTeams = () => {
	const [teams, setTeams] = useState({});

	const callAPI = async () => {
		await fetch(`http://192.168.1.65:3000/testTeamUrl`, {
			method: 'GET',
		})
			.then(res => {
				if (res.ok) {
					res.json().then(res => setTeams({ ...res }));
				} else {
					throw new Error('Something went wrong');
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		callAPI();
	}, []);

	return teams;
};

export default getTeams;
