import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';   
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import { WinStyle } from '../styles/BaseStyle'; 
import TabBarItem from '../components/TabBarItem';  

import HomePage from '../../PageList/HomePage/HomePage';
import Me from '../../PageList/Me/Me';

import CommonComponent from '../../PageList/Demo/CommonComponent';
import ComponentState from '../../PageList/Demo/ComponentState';
import ComponentSwitch from '../../PageList/Demo/ComponentSwitch';
import ComponentTime from '../../PageList/Demo/ComponentTime';
import MyList from '../../PageList/listViewDemo/MyList';
import MyFirstPage from '../../PageList/NavigatorPage/MyFirstPage';
import MySecondPage from '../../PageList/NavigatorPage/MySecondPage';  

const Tab = TabNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../images/index/home.png')}
                        selectedImage={require('../../images/index/home_f.png')} />
                )
            }),
        },  
        Me: {
            screen: Me,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../../images/index/me.png')}
                        selectedImage={require('../../images/index/me_f.png')} />
                )
            }),
        },
    }, 
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        lazy: true,
        mode:'modal',
        tabBarOptions: {
            activeTintColor: WinStyle.MainColor,
            style: { backgroundColor: '#fff' }
        }
    }
);

const screenObj = [
    {key:'Tab',value:Tab},
	{key:'CommonComponent',value:CommonComponent},
    {key:'ComponentState',value:ComponentState},
    {key:'ComponentSwitch',value:ComponentSwitch},
    {key:'ComponentTime',value:ComponentTime},
    {key:'MyList',value:MyList},
    {key:'MyFirstPage',value:MyFirstPage},
    {key:'MySecondPage',value:MySecondPage},
];

const StackNavigatorObj = {};
screenObj.map((item,i)=>{
    StackNavigatorObj[item.key] = { screen:item.value };
});

const ReactNavigation = StackNavigator(
	StackNavigatorObj,
	{
		headerMode: 'screen',
        transitionConfig:()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        }),
        navigationOptions: {
            header: null,
        },
	}
);

export default ReactNavigation;