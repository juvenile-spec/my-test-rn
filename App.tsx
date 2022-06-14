import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {storage} from './src/storage';
import {Provider} from 'mobx-react';
import store from './src/store';
import {observer} from 'mobx-react';
import {useStores} from './src/store/useStores';
import Icons from './src/components/Icons';

import Login from './src/pages/login';
import SignIn from './src/pages/signIn';
import Home from './src/pages/Home';
import DrawerContent from './src/pages/Drawer';
import Cover from './src/pages/Cover';
import Upload from './src/pages/Upload';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fa8072',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '主页',
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Icons type={0} name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          title: '上传',
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Icons type={0} name={'clouduploado'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: {width: '100%'},
        overlayColor: '0',
        drawerType: 'slide',
        swipeEdgeWidth: 100,
      }}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name="Drawer"
        options={{
          title: 'YouOfMe',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#fa8072',
          },
        }}
        component={MyTabs}
      />
    </Drawer.Navigator>
  );
};

const Nav = observer(() => {
  const {isSign} = useStores();
  useEffect(() => {
    let timer = setTimeout(() => {
      (async () => {
        try {
          await storage.load('uuid');
          isSign.setIsPass(2);
        } catch (e) {
          isSign.setIsPass(1);
        }
      })();
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSign]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSign.isPass === 0 ? (
          <>
            <Stack.Screen
              name="Cover"
              component={Cover}
              options={{
                headerShown: false,
                presentation: 'formSheet',
                animation: 'slide_from_right',
              }}
            />
          </>
        ) : isSign.isPass === 2 ? (
          <>
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: '',
                presentation: 'formSheet',
                animation: 'slide_from_right',
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const App = () => (
  <Provider {...store}>
    <Nav />
  </Provider>
);

export default App;
