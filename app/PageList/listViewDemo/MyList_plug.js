'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    Dimensions,
    AsyncStorage,
    navigator,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

import Loading from '../../Common/components/Loading';
import { WinStyle } from '../../Common/styles/BaseStyle';

export default class MyListPlug extends Component {
    constructor() {
        super();
        this.state = {
             
        }
    }
    _renderRow(rowData){
      if(rowData.hasOwnProperty('load')){
        return (
          <View style={styles.rowDataState}>
            <ActivityIndicator
              style={[styles.centering, {height: 40}]}
              size="small" color='#3ac569' />
            <Text style={{marginLeft:5}}>正在加载中...</Text>
          </View>
          );
      }
      else if(rowData.hasOwnProperty('netErr')){
            return (
                <TouchableOpacity
                    onPress={()=>{ this.props.retryData(); }
                }>
                    <View style={styles.rowDataState}>
                        <Text>
                            网络数据错误，点击再试
                        </Text>
                    </View>
                </TouchableOpacity>
            );
      }
      else if(rowData.hasOwnProperty('loadEnd')){
        return (
          <View style={styles.rowDataState}>
            <Text>没有更多数据了</Text>
          </View>
          );
      }
     
        return (<View style={styles.itemStyle}>
                   <View style={styles.nameStyle}>
                        <Text>{rowData.Name}</Text>
                   </View>
                   <View style={styles.cont}>
                        <View style={styles.levelBgStyle}></View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:40}}>
                            <Text>喜好</Text>
                            <Text>{rowData.hobby}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
                            <Text>预约时间</Text>
                            <Text>{rowData.ReservationTime}</Text>
                            <Text> {rowData.FollowCount}</Text>
                        </View>
                   </View>
                </View>);
    }
    render(){
        return (
                <ListView 
                  refreshControl={
                    <RefreshControl
                      refreshing={this.props.refreshing}
                      onRefresh={this.props.onRefresh}
                      colors={['#3ac569']}
                      tintColor={'#3ac569'}
                      progressBackgroundColor='#fff' />
                  }
                  style={styles.listViewStyle}
                  dataSource={this.props.recordData}
                  renderRow={this._renderRow.bind(this)}
                  initialListSize={5}
                  pageSize = {5}
                  removeClippedSubviews = {Platform.OS === 'ios' ? false : true}
                  scrollEventThrottle ={200}
                  onEndReachedThreshold = { 40 }
                  onEndReached ={this.props.endReached}
                  ref={(component) => this.props.getScrollViewRef(component)} />
            )
    }
}

const styles = StyleSheet.create({
    listViewStyle: {
        flex:1,
    },
    rowDataState: {
        flex:1,
        height:25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    centering:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemStyle: {
        marginBottom:10,
        paddingLeft:10,
        backgroundColor:'#fff',
    },
    nameStyle: {
        borderBottomWidth:1,
        height:34,
        justifyContent:'center',
        borderBottomColor: WinStyle.SplitColor
    },
    cont: {
        position:'relative',
        height:100,
        backgroundColor: '#ccc'
    },
    levelBgStyle: {
        position:'absolute',
        top:0,
        width:0,
        height:0,
        borderTopColor:'#3ac569',
        borderTopWidth:35,
        borderRightColor:'transparent',
        borderRightWidth:35,
    },
    levelTextStyle: {
        position:'absolute',
        top:4,
        left:0,
        backgroundColor:'transparent',
        color:'#fff',
        transform:[{rotate:'-45deg'}],
        fontSize:12,
    }

})