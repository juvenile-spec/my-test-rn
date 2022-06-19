import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import useStorageLoad from '../../hooks/useStorageLoad';
import {getQuery, ResultData} from '../../request/query';
import {toast} from '../../utils';
import ImageModal from '../../components/ImageModal';
import {useStores} from '../../store/useStores';
import Via from '../../components/Via';
import CustomAlertDialog from '../../components/CustomAlertDialog';

const Index = observer(() => {
  const [list, setList] = useState<ResultData[] | undefined>([]);
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const {isOpen, isVisible} = useStores();
  const uuid = useStorageLoad('uuid');

  useEffect(() => {
    getData();
  }, [uuid]);

  const getData = async () => {
    if (uuid) {
      const res = await getQuery({voucher: uuid.uid});
      toast(res.msg);
      if (res.code === 200) {
        setList(res.data);
      }
    }
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, [list]);
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.imgView} key={item.id}>
        <TouchableHighlight
          onPress={() => {
            setUrl(item.imgUrl);
            isOpen.setIsOpen(true);
          }}
          onLongPress={() => {
            setId(item.uuid);
            isVisible.setIsVisible(true);
          }}>
          <Image
            source={{uri: item.imgUrl}}
            style={{width: '100%', height: 200, resizeMode: 'cover'}}
          />
        </TouchableHighlight>
      </View>
    );
  };
  const renderEmpty = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.viaBox2}>
        <View style={styles.viaWrap}>
          <Via />
        </View>
        <Text style={styles.text}>好像还没有东西唉!</Text>
        <Text style={styles.text}>要不去上传一下!</Text>
        <Text style={styles.text}>APP暂不支持svg格式!</Text>
      </View>
    </ScrollView>
  );

  const ScrollFooter = () => (
    <View>
      <View style={styles.viaBox}>
        <Text style={styles.text}>没了没了到底了！！！</Text>
      </View>
    </View>
  );

  const closeModal = () => {
    isVisible.setIsVisible(false);
  };
  return (
    <SafeAreaView style={styles.wrap}>
      {list && list.length ? (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          horizontal={false}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onRefresh}
          onEndReachedThreshold={0.1}
          ListFooterComponent={ScrollFooter}
        />
      ) : (
        renderEmpty()
      )}
      <ImageModal url={url} />
      <CustomAlertDialog
        uid={id}
        title={'如果不是自己的作品，删除前请三思而后行？'}
        list={['确认删除']}
        closeModal={closeModal}
        updateRender={onRefresh}
      />
    </SafeAreaView>
  );
});

export default Index;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fffafa',
    padding: '1%',
  },
  imgView: {
    width: '48%',
    margin: '1%',
  },
  viaBox: {
    height: 50,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  viaWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  viaBox2: {
    height: 500,
    width: '100%',
    marginTop: 100,
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    fontSize: 20,
    color: '#e9967a',
  },
  footerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 40,
  },
});
