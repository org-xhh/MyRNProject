/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import MainPage from './app/Main';

export default class myAppProject extends Component {
  render() {
    return (
       <MainPage />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } 
});

AppRegistry.registerComponent('myAppProject', () => myAppProject);
