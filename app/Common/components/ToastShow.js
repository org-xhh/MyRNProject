'use strict';
import React, { Component,PropTypes } from 'react';

import {
    View,
    ToastAndroid,
    StyleSheet,
    Platform,
    NativeModules
} from 'react-native';

const toastModule = NativeModules.RNModule;


module.exports = {

    //安卓情况下，
    // msg：提示信息
    // duration：提示信息持续显示的时间 默认SHORT ， 传值“long(转小写)”为LONG

    //ios，
    // msg：提示信息
    //duration：（单位秒数） 提示信息持续显示的时间,默认1.5s
    ToastShow(msg,duration){
      if (Platform.OS === 'android') {
         return ToastAndroid.show(msg,
                  duration ?
                  (duration.toLowerCase() === "long" ? ToastAndroid.LONG : ToastAndroid.SHORT)
                  : ToastAndroid.SHORT);
      }else{
        // var showTime = !isNaN(duration) ? duration : 1.5;
        toastModule.hideHUD();
        toastModule.showMessage(msg);
        // toastModule.showMessageWithTime(msg,showTime);
      }
   }
}
