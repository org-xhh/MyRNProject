'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    AsyncStorage,
    TouchableHighlight,
    TouchableOpacity,
    DatePickerAndroid,
    TouchableWithoutFeedback,
    RefreshControl,
    StyleSheet,
    Dimensions,
    NativeModules,
    Platform
} from 'react-native';

import Loading from '../../Common/components/Loading';
import {ToastShow} from '../../Common/components/ToastShow';
import MyListPlug from './MyList_plug';

import { WinStyle } from '../../Common/styles/BaseStyle';
import { IconData } from '../../Common/styles/IconBase';
import HeadBar from '../../Common/components/HeadBar';

export default class MyList extends Component {
    constructor(props){
        super(props);
        this.timer=null;
        this.timer2=null;
        this.state = {
            resCount:0,
            PageIndex:1,
            PageCount:1,
            recordData:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            MoreData:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([{load:true}]),

            loadMore:false,
            isRefreshing:false,
            loaded:false,
        }
    }
    componentWillMount(){ 
       this.getListData();
    }
    componentDidMount(){
        
    }
     
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer2 && clearTimeout(this.timer2);
    }

    getListData() {
        // fetch('http://www.baidu.com')
        // .then((response) => response.json())
        // .then((result) => {
            let result = {
              "IsSuccess": true,
              "RecordCount":14,
              "Data": [
                {
                  "Name":"name1",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":1
                },
                {
                  "Name":"name2",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":2
                },
                {
                  "Name":"name3",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":3
                },
                {
                  "Name":"name4",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":4
                },
                {
                  "Name":"name5",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":5
                },
                {
                  "Name":"name6",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":6
                },
                {
                  "Name":"name7",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":7
                },
                {
                  "Name":"name8",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":8
                },
                {
                  "Name":"name9",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":9
                },
                {
                  "Name":"name10",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":10
                },
                {
                  "Name":"name11",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":11
                },
                {
                  "Name":"name12",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":12
                },
                {
                  "Name":"name13",
                  "hobby":"hobby1",
                  "ReservationTime":"2017-08-17",
                  "FollowCount":13
                },
                {
                  "Name":"name14",
                  "hobby":"hobby2",
                  "ReservationTime":"2017-08-18",
                  "FollowCount":14
                }
              ]
            };
            let PageCount=Math.ceil(result.RecordCount/5);
            let myList=result.Data ? result.Data : [];
            this.setState({
                loadMore:PageCount>1,
                resCount:myList.length,
                PageCount:PageCount,
            })
            if(myList.length<=0){
                this.setState({resCount:0})
            }

            this.timer = setTimeout(() =>{
                this.setState({
                    loaded:true,
                    recordData:this.state.recordData.cloneWithRows(this._linkCallList(myList)),
                });
            }, 150);
             
            this.timer2 = setTimeout(() =>{
                this.setState({isRefreshing: false,});
            }, 250);
            
        // })
        // .catch((error) => {
        //     this.handleError(error);
        // });
        
       
    }
    //处理错误
    handleError(err){
        this.setState({isRefreshing: false,loaded: true});
        if(this.state.PageIndex > 1){
            this.setState({
                MoreData:this.state.MoreData.cloneWithRows(this.state.resList.concat([{netErr:true}])),
            })
        }else{
           ToastShow('出错:'+err);
        }
    }
    //连接数据
    _linkCallList(data){
        let newData;
        if(!this.state.resList){
            newData = data;
        }
        else{
            let oldData= this.state.resList;
            newData = oldData.concat(data);
        }
        if(this.state.PageIndex < this.state.PageCount){
            this.setState({
                resList:newData,
                MoreData:this.state.MoreData.cloneWithRows(newData.concat([{load:true}])),
            })
        } else if(this.state.resCount>0){
            this.setState({
                resList:newData,
                MoreData:this.state.MoreData.cloneWithRows(newData.concat([{loadEnd:true}])),
            })
        }
        return newData;
    }

    //下拉刷新
    _onRefresh() {
        this.setState({
            resList:null,
            isRefreshing:true,
            PageIndex:1,
        },()=>{
          //刷新数据
          this.getListData();
        })
    }
    //上拉加载
    _endReach(){
        //不满一屏继续加载
        console.log(this.state.PageIndex,this.state.PageCount);
        if(this.state.PageIndex < this.state.PageCount){
            this.setState({
                PageIndex:this.state.PageIndex+1,//页标
                loadMore:true,
            },()=>{
              this.getListData();
            })
        }
    }
    getScrollViewRef(component) {
        this.scrollViewRef = component;
    }
    netErrRefreshData() {
        this.setState({
            MoreData:this.state.MoreData.cloneWithRows(this.state.resList.concat([{load:true}])),
        },()=>{
          this.getListData();
        })
    }
    //渲染列表
    renderList(){
        if(this.state.resCount==0&&this.state.PageIndex==1){
            return (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                colors={['#3ac569']}
                                tintColor={'#3ac569'}
                                progressBackgroundColor='#fff' />
                          }>
                              <View style={styles.TextView}>
                                  <View style={styles.recordBox}>
                                      <Image style={styles.searchIcon} source={IconData.searchIcon} />
                                      <Text style={styles.noText}>未查到相关记录</Text>
                                  </View>
                              </View>
                      </ScrollView>
            );
        } else {
             return (
                <MyListPlug
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    recordData={this.state.loadMore ? this.state.MoreData : this.state.recordData}
                    endReached={this._endReach.bind(this)}
                    getScrollViewRef={this.getScrollViewRef.bind(this)}
                    retryData ={this.netErrRefreshData.bind(this)}
                    navigator={this.props.navigator} />
                );
        }
    }

    render() {
        return(
            <View style={styles.pageStyle}>
                <HeadBar
                    title="列表"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.props.navigation.goBack()}} />
                {
                    !this.state.loaded ? (<View style={styles.loadingStyle}>
                                            <Loading />
                                          </View>)
                    : <View style={{flex:1,marginBottom:50}}>
                        { this.renderList() }
                      </View>
                }  
            </View>    
            )
    }
}

const winWidth  = WinStyle.WinWidth;
const winHeight = WinStyle.WinHeight;

const styles = StyleSheet.create({
    pageStyle: {
        flex:1,
        backgroundColor: WinStyle.PageBGColor
    },
    loadingStyle: {
        height:300,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    TextView:{
        flex:1,
        height:300,
        backgroundColor:'transparent',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    recordBox:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    searchIcon:{
        width:80,
        height:58,
    },
    noText:{
        marginTop:10,
    },
})
