import { StackNavigator, TabNavigator } from 'react-navigation';   
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import CommonComponent from '../../PageList/Demo/CommonComponent';
import ComponentState from '../../PageList/Demo/ComponentState';
import ComponentSwitch from '../../PageList/Demo/ComponentSwitch';
import ComponentTime from '../../PageList/Demo/ComponentTime';
import MyList from '../../PageList/listViewDemo/MyList';
import MyFirstPage from '../../PageList/NavigatorPage/MyFirstPage';
import MySecondPage from '../../PageList/NavigatorPage/MySecondPage';  
 
const screenObj = [
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
		initialRouteName:'MyFirstPage',
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