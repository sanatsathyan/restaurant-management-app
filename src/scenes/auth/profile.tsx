import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {BSHeader, BSLabel, BSTextBox} from '../../components';
import {themeColors, themeFontSize, themeGap} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SaveProfile} from '../../redux/user/actions';
import {UserState, ProfileType} from '../../redux/user/reducer';
import {ReducerType} from '../../redux/store';

import Toast from 'react-native-toast-message';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
  route: RouteProp<{params: {showBackButton?: boolean}}, 'params'>;
};

const Profile: React.FC<Props> = ({navigation, route}) => {
  const state = useSelector<ReducerType>(state => state.user) as UserState;
  const profile = state.profile;
  const [initials, setInitials] = useState<string>(profile.Initials || '..');
  const [name, setName] = useState<string>(profile.Name || '');
  const [designation, setDesignation] = useState<string>(
    profile.Designation || '',
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!name.trim()) {
      setInitials('..');
    } else {
      setInitials(
        name
          .toUpperCase()
          .split(' ')
          .slice(0, 2)
          .map(item => item.substring(0, 1))
          .join(''),
      );
    }
  }, [name]);

  const login = () => {
    if (!name || !designation) {
      Toast.show({
        type: 'error',
        text1: 'Fill in all the fields! 😟',
      });
      return;
    }
    const profile: ProfileType = {
      Name: name,
      Initials: initials,
      Designation: designation,
    };
    dispatch(SaveProfile(profile));
    if (!route.params || !route.params.showBackButton) {
      Toast.show({
        type: 'success',
        text1: `Welcome ${name}! 👋`,
        visibilityTime: 2000,
      });
    }
    navigation.navigate('App');
  };

  return (
    <View style={styles.overallPage}>
      <StatusBar
        backgroundColor={themeColors.LIGHT_PRIMARY_COLOR}
        barStyle="default"
      />
      <View style={styles.profileContainer}>
        <BSHeader
          hideBackButton={!route.params || !route.params.showBackButton}
          onBack={() => navigation.goBack()}
          title="PROFILE"
        />
        <View style={styles.profileSection}>
          <Avatar.Text size={themeGap.jumbo} label={initials} />
          <View style={styles.formSection}>
            <BSTextBox
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <BSTextBox
              label="Designation"
              value={designation}
              onChangeText={text => setDesignation(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <BSLabel style={styles.enterButtonText} title="SAVE" />
          <Icon
            name="arrow-forward-ios"
            size={24}
            color={themeColors.PRIMARY_COLOR}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{marginTop: themeGap.large}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallPage: {
    flex: 1,
    backgroundColor: themeColors.LIGHT_PRIMARY_COLOR,
  },
  profileContainer: {
    flex: 1,
  },
  profileSection: {
    padding: themeGap.base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
    paddingHorizontal: themeGap.base,
  },
  button: {
    padding: themeGap.base,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  enterButtonText: {
    color: themeColors.PRIMARY_COLOR,
    fontSize: themeFontSize.large,
    marginRight: themeGap.small,
  },
});

export default Profile;
