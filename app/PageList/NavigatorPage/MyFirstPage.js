import React, { Component } from 'react';
import {  
    StyleSheet,  
    Text,  
    Button,  
    View,  
} from 'react-native';  

import { IconData } from '../../Common/styles/IconBase';
import HeadBar from '../../Common/components/HeadBar';

export default class MyFirstPage extends Component {  
    goToSecondPage(){
        this.props.navigation.navigate('MySecondPage', 
            {
                user: 'xhh',
                callback: (data)=>{
                    alert(data); 
                }
            }
        )
    } 
    render() {  
        return (  
            <View style={{flex:1}}>  
                <HeadBar
                    title="第一页"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.props.navigation.goBack()}} />
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => this.goToSecondPage()}
                        title="Chat with xhh"  /> 
                </View> 
            </View>  
        );  
    }  
}  
const styles = StyleSheet.create({
     btnStyle: {
        marginVertical:5
     }
})