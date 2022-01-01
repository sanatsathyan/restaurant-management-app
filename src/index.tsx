import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Toast, {BaseToast} from 'react-native-toast-message';

import SplashScreen from 'react-native-splash-screen';

import AuthScreen from './scenes/auth';
import AppScreen from './scenes/app';
import ProfileScreen from './scenes/auth/profile';
import {store, persistor} from './redux/store';
import {themeColors, themeContants, themeFontSize} from './theme';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  roundness: 0,
  fonts: {
    regular: {
      fontFamily: themeContants.fontFamily,
    },
    medium: {
      fontFamily: themeContants.fontFamily,
    },
    thin: {
      fontFamily: themeContants.fontFamily,
    },
    light: {
      fontFamily: themeContants.fontFamily,
    },
  },
  colors: {
    ...DefaultTheme.colors,
    text: '#666666',
    primary: themeColors.PRIMARY_COLOR,
    accent: themeColors.SECONDARY_COLOR,
    background: themeColors.BACKGROUND_COLOR,
  },
};

const Main: React.FC<{}> = ({}) => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 100);
  }, []);

  const toastConfig = {
    success: ({...rest}) => (
      <BaseToast
        {...rest}
        style={{width: '95%'}}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
      />
    ),
    error: ({...rest}) => (
      <BaseToast
        {...rest}
        style={{width: '95%'}}
        text1Style={[styles.text1Style, {color: themeColors.ERROR}]}
        text2Style={[styles.text2Style, {color: themeColors.ERROR}]}
      />
    ),
    info: ({...rest}) => (
      <BaseToast
        {...rest}
        style={{width: '95%'}}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
      />
    ),
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Auth" component={AuthScreen} />
                  <Stack.Screen name="App" component={AppScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
              </NavigationContainer>
              <Toast position="top" topOffset={8} config={toastConfig} />
            </View>
          </TouchableWithoutFeedback>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  text1Style: {
    fontFamily: themeContants.fontFamily,
    fontWeight: 'normal',
    fontSize: themeFontSize.medium,
    color: themeColors.SECONDARY_COLOR,
  },
  text2Style: {
    fontFamily: themeContants.fontFamily,
    fontSize: themeFontSize.base,
    color: themeColors.SECONDARY_COLOR,
  },
});

export default Main;
