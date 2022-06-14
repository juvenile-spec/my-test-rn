import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Via from '../../components/Via';
import {Button} from 'react-native-paper';
import {toast} from '../../utils';
import {storage} from '../../storage';
import {useStores} from '../../store/useStores';
const DrawerContent = () => {
  const {isSign} = useStores();

  const handleLogin = () => {
    toast('溜成功');
    isSign.setIsPass(1);
    storage.remove('uuid');
  };
  return (
    <DrawerContentScrollView>
      <View style={styles.wrap}>
        <View style={styles.viaWrap}>
          <Via />
        </View>
      </View>
      <Text style={styles.text}>少壮不努力</Text>
      <Text style={styles.text}>老大徒伤悲</Text>
      <View style={styles.buttonWrap}>
        <Button
          style={styles.buttonStyle}
          icon="arrow-expand-right"
          onPress={handleLogin}
          color="#ff6347"
          mode={'contained'}
          labelStyle={{fontSize: 20}}>
          溜了 溜了
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    backgroundColor: '#eee',
    marginTop: -5,
    marginBottom: 50,
  },
  viaWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  buttonWrap: {
    paddingHorizontal: 80,
  },
  buttonStyle: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
  },
});
