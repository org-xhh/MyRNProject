import React, { Component } from 'react';
import {  
    StyleSheet,  
    Text,  
    Button,  
    View,
    TouchableOpacity  
} from 'react-native';  

import { IconData } from '../../Common/styles/IconBase';
import { WinStyle } from '../../Common/styles/BaseStyle';

import HeadBar from '../../Common/components/HeadBar';
import AnimateNumber from '../../Common/components/AnimateNumber';
import CheckBox from '../../Common/components/CheckBox';
import Progress from '../../Common/components/Progress';
import Radio from '../../Common/components/Radio';
import RateStar from '../../Common/components/RateStar';

export default class CommonComponent extends Component {  
	constructor(props){
		super(props);
		this.state = {
			animateNumber: 2136576,
			num:5,	
			currIndex:5,
		}
		this.scoreArr = [0,0,0,0,0];
		const { navigate,state,goBack } = this.props.navigation;
        this.params = state.params || {};
        this.goBack = goBack;
	}
	// 3位数格式化（例：11,758）
	milliFormat(numStr) {
	    var n = numStr + "";
	    var re = /\d{1,3}(?=(\d{3})+$)/g;
	    var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
	        return s1.replace(re, "$&,") + s2;
	    });
	    return n1;
	}
    getScore(index,score){
      // index: 0 1 2 3 4 
      // score是组件this.starClick.bind(this,1)传过来的
      this.scoreArr[index] = score;
      alert(JSON.stringify(this.scoreArr));
    }
    renderCompFn() {
    	let check_props = [
	        {label: '护照', value:0, selected: false },
	        {label: '港澳通行证', value:1, selected: false },
	        {label: '身份证', value:2, selected: false },
	    ];
        let radio_props = [
           {label: '男', value:0, selected: 1 },
           {label: '女', value:1, selected: 0 }
        ];
		let { animateNumber,num } = this.state;
		if(num == 1){
			return (
			 <AnimateNumber style={styles.totalNumTxt} value={animateNumber} formatter={(val) => {
			        return this.milliFormat(parseInt(val))
			   }}/>
			)
		} else if(num == 2){
			return (
	         <CheckBox
	           btnHeight={50} 
	           check_props={check_props}  
	           iconStyle={{width:20,height:20}}         
	           labelStyle={{fontSize:16,color:'#f60'}}  
	           onClick={(arr)=>{alert(JSON.stringify(arr))}}  />  
	        )
		} else if(num == 3){
			return (
			   <Progress progressNum={80} />
		    )
		} else if(num ==4) {
			return (
			 <Radio
		        btnHeight={50} 
		        iconSize={16}
		        iconColor={'#f60'} 
		        radio_props={radio_props}  
		        labelStyle={{fontSize:14,color:'#f60'}} 
		        onClick={(obj)=>{alert(JSON.stringify(obj))}} />
	        )
		} else if(num ==5) {
			return (
			  <View style={{padding:15}}>
                <RateStar name = '总体评价' initStar = {0} starNum = {this.getScore.bind(this,0)} />
                <RateStar style = {{marginTop:15}} name = '工作人员' initStar = {0} starNum = {this.getScore.bind(this,1)} />
                <RateStar style = {{marginTop:15}} name = '活动氛围' initStar = {0} starNum = {this.getScore.bind(this,2)} />
                <RateStar style = {{marginTop:15}} name = '活动流程' initStar = {0} starNum = {this.getScore.bind(this,3)} />
                <RateStar style = {{marginTop:15}} name = '活动互动性' initStar = {0} starNum = {this.getScore.bind(this,4)} />
             </View>
	        )
		}
    }
    changeComp(num){
    	this.setState({
    		num,
    		currIndex:num
    	})
    }
	render(){
		let {currIndex} = this.state;
		return (
			<View>
 				<HeadBar
                    title="标题"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.goBack()}} />
				<View style={{flexDirection:'row'}}>
					<TouchableOpacity onPress={()=>{this.changeComp(1)}}><Text style={{color:currIndex == 1 ? '#f00' : '#666'}}> 数字组件 </Text></TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.changeComp(2)}}><Text style={{color:currIndex == 2 ? '#f00' : '#666'}}> 多选框</Text></TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.changeComp(3)}}><Text style={{color:currIndex == 3 ? '#f00' : '#666'}}> 进度条 </Text></TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.changeComp(4)}}><Text style={{color:currIndex == 4 ? '#f00' : '#666'}}> 单选框 </Text></TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.changeComp(5)}}><Text style={{color:currIndex == 5 ? '#f00' : '#666'}}> 评价星级 </Text></TouchableOpacity>
				</View>	
				{ this.renderCompFn() }
			</View>
			
		)
	}
}

const winWidth  = WinStyle.WinWidth;
const winHeight = WinStyle.WinHeight;

const styles = StyleSheet.create({
  totalNumTxt:{
  	 color:'#ff674b',
  	 fontSize:winWidth < 330 ? 30 : 36,
  	 fontWeight:'bold',
  }
})



