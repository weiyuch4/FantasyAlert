import { CacheManager } from 'react-native-expo-image-cache';
import updateSearchFullRoster from './UpdateSearchFullRoster';
import getFullRoster from './GetFullRoster';

const dailyUpdate = async () => {

  //updateFullRoster();
  //updateSearchFullRoster();
  await CacheManager.clearCache();

};

export default dailyUpdate;