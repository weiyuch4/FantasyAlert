import { API_URL } from 'react-native-dotenv';

const getFullRoster = async (setFullRoster) => {

  await fetch(`${API_URL}/testRoster`, {
    method: 'GET',
  })
    .then(res => {
      if (res.ok) {
        res.json().then(res => setFullRoster({ ...res }));
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch(error => {
      console.log(error);
    });

};

export default getFullRoster;