import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/core';
import {themeColors, themeFontSize, themeGap} from '../../theme';
import {BSLabel} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {ReducerType} from '../../redux/store';
import {UserState} from '../../redux/user/reducer';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const Auth: React.FC<Props> = ({navigation}) => {
  const state = useSelector<ReducerType>(state => state.user) as UserState;
  const profile = state.profile;
  const login = () => {
    if (!profile.Name) navigation.navigate('Profile');
    else navigation.navigate('App');
  };

  return (
    <>
      <StatusBar
        backgroundColor={themeColors.PRIMARY_COLOR}
        barStyle="default"
      />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Animated.Image
            source={require('../../assets/images/logo_full.png')}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <BSLabel style={styles.enterButtonText} title="ENTER" />
          <Icon
            name="arrow-forward-ios"
            size={24}
            color={themeColors.SECONDARY_COLOR}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themeGap.base,
    backgroundColor: themeColors.PRIMARY_COLOR,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
  },
  button: {
    padding: themeGap.base,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  enterButtonText: {
    color: themeColors.SECONDARY_COLOR,
    fontSize: themeFontSize.large,
    marginRight: themeGap.small,
  },
});

export default Auth;
