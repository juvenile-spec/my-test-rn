import React, {FC} from 'react';

import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';

import {useStores} from '../../store/useStores';
import {setDelete} from '../../request/delete';
import {toast} from '../../utils';
import useStorageLoad from '../../hooks/useStorageLoad';

const {width} = Dimensions.get('window');

interface Props {
  uid: string;
  title: string;
  list: string[];
  closeModal: () => void;
  updateRender: () => void;
}

const CustomAlertDialog: FC<Props> = observer(
  ({title, list, closeModal, uid, updateRender}) => {
    const {isVisible} = useStores();
    const uuid = useStorageLoad('uuid');

    const renderItem = (item: any, i: number) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={async () => {
            const res = await setDelete({
              voucher: uuid.uid,
              deleteId: {uuid: uid},
            });
            updateRender();
            isVisible.setIsVisible(false);
            toast(res.msg);
          }}
          style={styles.item}>
          <Text style={styles.commonFontSize}>{item}</Text>
        </TouchableOpacity>
      );
    };

    const renderDialog = (data: {title: any; list: any}) => {
      return (
        <View style={[styles.modalStyle]}>
          <View style={styles.optArea}>
            <View style={styles.titleWrap}>
              <Text
                onPress={() => {
                  isVisible.setIsVisible(true);
                }}
                style={[styles.titleText, styles.commonFontSize]}>
                {data.title}
              </Text>
            </View>
            {data.list.map((item: any, i: number): any => renderItem(item, i))}
            <TouchableOpacity style={styles.titleWrap} onPress={closeModal}>
              <Text style={[styles.cancelText, styles.commonFontSize]}>
                取消
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View>
        <View style={{flex: 1}}>
          <Modal
            transparent={true}
            visible={isVisible.isVisible}
            animationType={'slide'}
            onRequestClose={closeModal}>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPress={closeModal}>
              {renderDialog({title, list})}
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    );
  },
);

export default CustomAlertDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commonFontSize: {
    fontSize: 25,
  },
  modalStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#eee',
  },
  optArea: {
    flexDirection: 'column',
  },
  titleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  titleText: {
    paddingVertical: 10,
    color: '#a9a9a9',
  },
  item: {
    width: width,
    height: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  itemText: {
    fontSize: 25,
  },
  cancelWrap: {
    height: 100,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cancelText: {
    paddingVertical: 10,
    color: '#f08080',
  },
});
