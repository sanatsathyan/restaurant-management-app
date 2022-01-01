import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {themeColors, themeFontSize, themeGap} from '../../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'react-native-paper';
import {BSLabel} from '../../../../components';
import {useSelector} from 'react-redux';
import {ReducerType} from '../../../../redux/store';
import {UserState} from '../../../../redux/user/reducer';

type Props = {
  navigation: NavigationProp<any, any, any, any, any>;
};

const Settings: React.FC<Props> = ({navigation}) => {
  const state = useSelector<ReducerType>(state => state.user) as UserState;
  const profile = state.profile;
  const menuList = [
    {
      icon: 'auto-stories',
      menuTitle: 'Add/Modify Menu Items',
      screen: 'Menu',
    },
    {
      icon: 'app-settings-alt',
      menuTitle: 'Settings & Configurations',
      screen: 'Settings',
    },
    // {
    //   icon: 'info-outline',
    //   menuTitle: 'About',
    // },
  ];

  const logout = () => {
    navigation.navigate('Auth');
  };

  const handleRedirect = (screenName?: string) => {
    if (screenName) navigation.navigate(screenName);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() =>
            navigation.navigate('Profile', {showBackButton: true})
          }>
          <Avatar.Text size={64} label={profile.Initials} />
          <View style={styles.profileContent}>
            <BSLabel style={styles.profileName} title={profile.Name}></BSLabel>
            <BSLabel
              style={styles.profileRole}
              title={profile.Designation}></BSLabel>
          </View>
        </TouchableOpacity>
        {menuList.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.listItem}
            onPress={() => handleRedirect(item.screen)}>
            <Icon name={item.icon} size={18} />
            <BSLabel
              style={styles.listItemText}
              title={item.menuTitle}></BSLabel>
            <Icon name="arrow-forward-ios" size={12} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.listItem} onPress={logout}>
          <Icon name="logout" size={18} />
          <BSLabel style={styles.listItemText} title="Logout"></BSLabel>
        </TouchableOpacity>
      </View>
      <BSLabel style={styles.copyright} title={'© 2022, RenieDuPreez ❤️'} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
    paddingHorizontal: themeGap.medium,
    paddingTop: themeGap.large,
    paddingBottom: themeGap.small,
    alignItems: 'center',
  },
  profileContent: {
    flexDirection: 'column',
    paddingHorizontal: themeGap.medium,
  },
  profileName: {
    fontSize: themeFontSize.large,
    color: themeColors.PRIMARY_COLOR,
  },
  profileRole: {
    fontSize: themeFontSize.base,
    color: themeColors.SECONDARY_COLOR,
  },
  listItem: {
    flexDirection: 'row',
    padding: themeGap.medium,
    borderBottomColor: themeColors.LIGHT_GRAY,
    borderBottomWidth: 1,
    alignItems: 'flex-end',
  },
  listItemText: {
    flex: 1,
    paddingHorizontal: themeGap.base,
  },
  copyright: {
    alignSelf: 'center',
    fontSize: themeFontSize.base,
    color: themeColors.SECONDARY_COLOR,
    marginBottom: themeGap.small,
  },
});

export default Settings;
