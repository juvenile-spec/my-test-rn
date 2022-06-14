import {ToastAndroid} from 'react-native';

export const toast = (msg: string) => {
  ToastAndroid.showWithGravityAndOffset(msg, 2000, ToastAndroid.TOP, 25, 150);
};
