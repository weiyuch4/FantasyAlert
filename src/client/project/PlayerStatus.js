import React, { useEffect, useState } from 'react';

const getAllPlayerStatus = () => {

  const [allPlayerResponse, setAllPlayerResponse] = useState({});

  const callAPI = async () => {
    //console.log(process.env.REACT_APP_API_URL);
    await fetch(`http://192.168.1.65:3000/testPlayer`, {
      method: 'GET',
    },
    )
      .then(res => {
        if (res.ok) {
          res.json().then(res => setAllPlayerResponse({...res}))
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    callAPI();
  }, []);
  
  return allPlayerResponse;
}

export default getAllPlayerStatus;