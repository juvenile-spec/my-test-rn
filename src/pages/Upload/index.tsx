import {StyleSheet, View, TouchableHighlight} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {uploadPhoto} from './uploadMethod';
import useStorageLoad from '../../hooks/useStorageLoad';
import Icon from '../../components/Icons';

const Index = observer(() => {
  const uuid = useStorageLoad('uuid');

  return (
    <View style={styles.wrap}>
      <TouchableHighlight
        style={styles.upload}
        underlayColor={'#b0c4de'}
        onPress={async () => {
          await uploadPhoto(uuid.uid);
        }}>
        <Icon name={'upload-cloud'} type={3} size={130} color={'#faf0e6'} />
      </TouchableHighlight>
    </View>
  );
});

export default Index;

const styles = StyleSheet.create({
  wrap: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffafa',
  },
  upload: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#e6e6fa',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
  },
});
