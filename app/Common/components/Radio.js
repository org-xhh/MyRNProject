
// Creat by yh07654
// Update by yh07654 2017-04-12
'use strict';
import React, { Component,PropTypes } from 'react';

import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';

/*使用方法
      <Radio
         btnHeight={50} //触摸区域高度，默认44
         iconSize={16} //图标大小，最小默认16
          iconColor={'#f60'} //图标颜色，默认#5ECAFB
         radio_props={radio_props} //数据源
         labelStyle={{fontSize:14,color:'#f60'}} //文案样式
         onClick={(obj)=>{}} //返回选项obj {label: '男', value:0, selected: 1 }
       />
       radio_props = [
         {label: '男', value:0, selected: 1 },
           {label: '女', value:1, selected: 0 }
      ]
*/

export default class Radio extends Component {
    constructor(props){
        super(props);
        this.state={
            radio_props:this.props.radio_props,
            iconSize:props.iconSize && props.iconSize >= 16 ? props.iconSize : 16
        }
    }

    handleClick(i){
        let a = this.props.radio_props;
        a.map((option) => {option.selected=0;});
        a[i].selected=1;
        this.setState({radio_props:a})
        this.props.onClick(a[i]);
    }
    _renderRadioBtn(option,i){
        return (
                <TouchableOpacity activeOpacity={1} onPress={this.handleClick.bind(this,i)}  key={i}  style={{marginRight:10,height:this.props.btnHeight || 44,borderColor:'#f50',}}>
                    <View style={{flexDirection:'row',height:this.props.btnHeight || 44,justifyContent:'center',alignItems:'center'}}>
                        <View style={[styles.outCircle,{width:this.state.iconSize,height:this.state.iconSize,borderRadius:this.state.iconSize/2,borderColor:this.props.iconColor || '#5ECAFB'}]}>
                            <View style={[styles.innerCircle,{width:this.state.iconSize - 8,height:this.state.iconSize - 8,borderRadius:(this.state.iconSize-8)/2,backgroundColor:this.props.iconColor || '#5ECAFB',opacity:this.state.radio_props[i].selected}]}></View>
                        </View>
                        <Text style={[styles.labelTxt,this.props.labelStyle]}>{option.label}</Text>
                    </View>
                </TouchableOpacity>
        );
    }
    render() {
        let radiobtns = this.props.radio_props.map((option,i) => {
            return (this._renderRadioBtn(option,i));
        });
        return(<View style={[this.props.needWrap ? styles.radioWrap :styles.radio,this.props.style]}>
                    {radiobtns}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    radio:{
          flex:1,flexDirection:'row',flexWrap:'wrap',
    },
    outCircle:{
        width:20,
        height:20,
        borderWidth:2,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center',
        marginRight:2
    },
    innerCircle:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:'#5ECAFB',
    },
    labelTxt:{
        fontSize:12,
        color:'#000',
    },
});
