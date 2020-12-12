import React, { useEffect, useState } from 'react';
import { call } from 'react-native-reanimated';

const getAllPlayerStatus = (followed) => {

  const [allPlayerResponse, setAllPlayerResponse] = useState({});

  const sendFollowed = () => {
    fetch('http://192.168.1.65:3000/testPlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'followed': followed}),
    }).then(res => {
        if (res.ok) {
          res.json().then(res => setAllPlayerResponse({...res}))
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    sendFollowed();
  }, [followed]);
  
  return allPlayerResponse;
}

export default getAllPlayerStatus;