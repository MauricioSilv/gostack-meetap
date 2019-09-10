import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import logo from '~/assets/M.png';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            Index: createBottomTabNavigator(
              {
                Dashboard,
                Subscriptions,
                Profile,
              },
              {
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#fff',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    backgroundColor: '#2B1A2F',
                    borderTopColor: 'transparent',
                  },
                },
              }
            ),
          },
          {
            defaultNavigationOptions: {
              headerStyle: {
                backgroundColor: '#000000',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitle: (
                <Image
                  source={logo}
                  style={{ width: 35, height: 35, flex: 1 }}
                  resizeMode="contain"
                />
              ),
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
