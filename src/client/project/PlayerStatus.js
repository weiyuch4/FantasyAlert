import React, { useEffect, useState, useContext } from 'react';
import { call } from 'react-native-reanimated';
import { API_URL } from 'react-native-dotenv';

const getAllPlayerStatus = (followed, setFollowedStatus) => {
	
	const sendFollowed = () => {
		fetch(`${API_URL}/testPlayer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ followed: followed }),
		})
			.then(res => {
				if (res.ok) {
					res.json().then(res => setFollowedStatus({ ...res }));
				} else {
					throw new Error('Something went wrong');
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	sendFollowed();

};


export default getAllPlayerStatus;
