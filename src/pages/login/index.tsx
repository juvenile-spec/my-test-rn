import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {storage} from '../../storage';
import {setLogin} from '../../request/login';
import {toast} from '../../utils';
import {observer} from 'mobx-react';
import {useStores} from '../../store/useStores';

const Index = observer(({navigation}: any) => {
  const [value, setValue] = useState('');
  const {isSign} = useStores();
  const onChangeText = (val: string) => {
    setValue(val);
  };

  const handleLogin = async () => {
    const res = await setLogin({account: value});
    toast(res.msg);
    if (res.code === 200) {
      isSign.setIsPass(2);
      storage.save('uuid', {uid: res.data?.uuid});
    }
  };

  return (
    <ScrollView style={styles.wrap} keyboardShouldPersistTaps={'handled'}>
      <View style={styles.title}>
        <Text style={{fontSize: 50, color: '#ff6347'}}>嘿,你好呀!</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          textAlign={'center'}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder={'请输入6-20位大写字母'}
          placeholderTextColor={'#ff6347'}
          maxLength={20}
          autoCapitalize={'characters'}
        />
        <Button
          style={styles.buttonStyle}
          icon="login"
          onPress={handleLogin}
          color="#ff6347"
          mode={'contained'}
          labelStyle={{fontSize: 20}}>
          请登录
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={{fontSize: 20}}>还没有账户?</Text>
        <Button
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          color="#ff6347"
          labelStyle={{fontSize: 20}}>
          注册
        </Button>
      </View>
    </ScrollView>
  );
});
export default Index;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    paddingTop: 100,
    textAlign: 'center',
  },
  inputBox: {
    flex: 1,
    paddingTop: 130,
    paddingHorizontal: 40,
  },
  textInput: {
    height: 60,
    marginBottom: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 100,
  },
});
