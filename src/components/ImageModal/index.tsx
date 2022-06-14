import React from 'react';
import {Modal, PermissionsAndroid} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import {observer} from 'mobx-react';
import {useStores} from '../../store/useStores';
import {toast} from '../../utils';

const Index = observer(({url}: any) => {
  const {isOpen} = useStores();
  if (!url) {
    return null;
  }
  const images = [{url}];

  const savePhoto = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App相册权限申请',
          message: 'App需要保存图片到您的相册',
          buttonNeutral: '稍后询问',
          buttonNegative: '取消',
          buttonPositive: '确定',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let androidDownPath = `${RNFS.DocumentDirectoryPath}/${
          (Math.random() * 1000) | 0
        }.jpg`;
        let DownloadFileOptions = {
          fromUrl: url, //下载路径
          toFile: androidDownPath, // Local filesystem path to save the file to
        };
        let result = RNFS.downloadFile(DownloadFileOptions);
        result.promise
          .then(
            function () {
              console.log('文件下载成功：' + androidDownPath);
              let promise = CameraRoll.save(androidDownPath);
              promise
                .then(function () {
                  toast('保存成功！');
                  console.log('保存成功！');
                })
                .catch(function (error) {
                  toast('保存失败！');
                  console.log('保存失败！' + error);
                });
            },
            function (val) {
              console.log('Error Result:' + JSON.stringify(val));
            },
          )
          .catch(function (error) {
            console.log(error.message);
          });
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Modal visible={isOpen.isOpen} transparent={true}>
      <ImageViewer
        imageUrls={images}
        enableImageZoom={true}
        menuContext={{saveToLocal: '保存图片', cancel: '取消'}}
        onClick={() => {
          isOpen.setIsOpen(false);
        }}
        onSave={savePhoto}
      />
    </Modal>
  );
});
export default Index;
