'use strict'

import React, { Component,PropTypes } from 'react';

import {
    View,
    StyleSheet,
    ActivityIndicator,
    Platform
} from 'react-native';

var GiftedSpinner = React.createClass({
  render() {
    return (
      <ActivityIndicator
        color={this.props.color || '#3ac569'}
        style={[styles.centering, {height: 40}]}
        size={Platform.OS === 'android' ? 'large' : 'small'} />
    );
  },
});

module.exports = React.createClass({
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <GiftedSpinner color={this.props.color} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
