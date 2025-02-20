import { API_URL } from 'react-native-dotenv';

const getTeams = async (setTeams) => {

  await fetch(`${API_URL}/testTeamUrl`, {
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

export default getTeams;
