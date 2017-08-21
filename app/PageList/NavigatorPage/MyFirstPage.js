import React, { Component } from 'react';
import {  
    StyleSheet,  
    Text,  
    Button,  
    View,  
} from 'react-native';  

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
        const { navigate } = this.props.navigation;  
        return (  
            <View style={{flex:1}}>  
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => this.goToSecondPage()}
                        title="Chat with xhh"  /> 
                </View> 
                <View style={styles.btnStyle}>
                    <Button 
                        onPress={() => navigate('ComponentState')} 
                        title="ComponentState"  /> 
                </View>
                <View style={styles.btnStyle}>
                    <Button  
                        onPress={() => navigate('ComponentSwitch')} 
                        title="ComponentSwitch"  /> 
                </View> 
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('ComponentTime')} 
                        title="ComponentTime"  />
                </View> 
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('MyList')} 
                        title="MyList"  />   
                </View>
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('CommonComponent')} 
                        title="CommonComponent"  />   
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