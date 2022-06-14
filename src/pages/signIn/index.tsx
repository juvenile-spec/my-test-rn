import {StyleSheet, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {setSignIn} from '../../request/signIn';
import {toast} from '../../utils';

const Index = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const onChangeText = (val: string) => {
    setValue(val);
  };

  const handleSignIn = async () => {
    try {
      const res = await setSignIn({account: value});
      toast(res.msg);
      if (res.code === 200) {
        navigation.navigate('Login');
      }
    } catch (err) {}
  };

  return (
    <ScrollView style={styles.inputBox} keyboardShouldPersistTaps={'handled'}>
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
        onPress={handleSignIn}
        color="#ff6347"
        mode={'contained'}
        labelStyle={{fontSize: 20}}>
        请注册
      </Button>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    paddingHorizontal: 40,
    width: '100%',
    height: '100%',
    paddingTop: 240,
    backgroundColor: '#fff',
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
});
