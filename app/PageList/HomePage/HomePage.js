import React, { Component } from 'react';
import {  
    StyleSheet,  
    Text,  
    Button,  
    View,  
} from 'react-native';  

export default class HomePage extends Component {   
    render() {  
        const { navigate } = this.props.navigation;  
        return (  
            <View style={{flex:1}}>  
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('MyFirstPage')}
                        title="第一页" /> 
                </View> 
                <View style={styles.btnStyle}>
                    <Button 
                        onPress={() => navigate('ComponentState')} 
                        title="状态"  /> 
                </View>
                <View style={styles.btnStyle}>
                    <Button  
                        onPress={() => navigate('ComponentSwitch')} 
                        title="开关组件"  /> 
                </View> 
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('ComponentTime')} 
                        title="生命周期"  />
                </View> 
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('MyList')} 
                        title="列表"  />   
                </View>
                <View style={styles.btnStyle}>
                    <Button
                        onPress={() => navigate('CommonComponent')} 
                        title="组件"  />   
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