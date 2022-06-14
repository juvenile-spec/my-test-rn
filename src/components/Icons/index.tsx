import React, {FC} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
/*
 图标在这个网站寻找
 https://oblador.github.io/react-native-vector-icons/

 需要在android/app/build.gradle里配置才可用
 apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
*/

const Index: FC<{
  type: number;
  name: string;
  color?: string;
  size?: number;
}> = ({name, type = 0, color, size}) => {
  switch (type) {
    case 0:
      return <IconAntDesign name={name} color={color} size={size} />;
    case 1:
      return <IconEntypo name={name} color={color} size={size} />;
    case 2:
      return <IconEvilIcons name={name} color={color} size={size} />;
    case 3:
      return <IconFeather name={name} color={color} size={size} />;
    case 4:
      return <IconFontAwesome name={name} color={color} size={size} />;
    case 5:
      return <IconFontAwesome5 name={name} color={color} size={size} />;
    case 6:
      return <IconFontisto name={name} color={color} size={size} />;
    case 7:
      return <IconFoundation name={name} color={color} size={size} />;
    case 8:
      return <IconIonicons name={name} color={color} size={size} />;
    case 9:
      return <IconMaterialIcons name={name} color={color} size={size} />;
    case 10:
      return <IconMaterialCommunity name={name} color={color} size={size} />;
    case 11:
      return <IconOcticons name={name} color={color} size={size} />;
    case 12:
      return <IconZocial name={name} color={color} size={size} />;
    default:
      return <IconSimpleLineIcons name={name} color={color} size={size} />;
  }
};

export default Index;
