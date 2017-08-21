import React, { Component,PropTypes } from 'react';
import { Dimensions } from 'react-native';
const winDimensions = Dimensions.get('window');

export const WinStyle = {
    theme: '#3ac569',
    border: '#e1e1e1',
    background: '#f0f0f0',
    WinWidth: winDimensions.width,
    WinHeight: winDimensions.height,
    winWidth: winDimensions.width,
    winHeight: winDimensions.height,
    PageBGColor:'#f0f0f0',//页面背景色
    SplitColor:'#e1e1e1',
    MainColor:'#3ac569',
    DataMainColor:'#3ac569',//数据模块主色调
    EchartsColor:'#86dca2',//报表主色调
    WidthScale:750,
};