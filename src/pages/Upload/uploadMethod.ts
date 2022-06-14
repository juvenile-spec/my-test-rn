import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {toast} from '../../utils';
import {setUpload} from '../../request/upload';

export const uploadPhoto = async (voucher: string) => {
  const option: {mediaType: 'photo'} = {mediaType: 'photo'};
  const res = await launchImageLibrary(option);
  if (res.didCancel) {
    toast('我先想想在选择!!!');
  } else if (res.errorCode) {
    toast(res.errorCode);
  } else if (res.errorMessage) {
    toast(res.errorMessage);
  } else {
    const [data]: Asset[] | undefined = res?.assets || [];
    const formData = new FormData();
    const file = {
      uri: data.uri,
      type: 'multipart/form-data',
      name: data.fileName,
    };
    formData.append('file', file);
    const result = await setUpload({voucher, formData});
    toast(result.msg);
  }
};
