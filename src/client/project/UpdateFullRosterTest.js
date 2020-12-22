import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  if (data.isLoaded === true) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@followed', jsonValue);
    } catch (err) {
      alert(err);
    }
  }
};