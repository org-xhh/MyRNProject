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

import { TOKEN_NAME,VipSaleCountAPI,GetAreaInfoList,VipSaleListAPI,GetListByTypeKey } from '../../Common/services/Interfaces';
import {XGFetch,FetchResult,VerifyInterfaceErr} from '../../Common/services/XGFetch';
import {formatDate} from '../../Common/services/DateFormat';
import GlobalState from '../../Common/services/GlobalState';
import { talkingData } from '../../Common/services/talkingData';

import Search from '../../Common/components/search';
import HeadNavBar from '../../Common/components/HeadNavBar';
import Loading from '../../Common/components/Spinner';
import Dialog from '../../Common/components/Dialog';
import {ToastShow} from '../../Common/components/ToastShow';
import MySaleChanceList from './MySaleChanceList_plug';

import { WinStyle } from '../../Common/style/ComStyle';
import { IconData } from '../../Common/style/IconBase';
const toastModule = NativeModules.RNModule;

const KIND_NORMAL = require('../../images/kind.png');
const FILTER_NORMAL = require('../../images/filterIcon.png');
const SORT_NORMAL = require('../../images/sortIcon.png');
const KIND_FOCUS = require('../../images/kind_f.png');
const FILTER_FOCUS = require('../../images/filterIcon_f.png');
const SORT_FOCUS = require('../../images/sortIcon_f.png');

export default class MySaleChance extends Component {
    constructor(props){
        super(props);
        this.timer=null;
        this.timer2=null;
        this.state = {
            searchName: '',
            searchPhone: '',

            resCount:0,
            PageIndex:1,
            PageCount:1,
            recordData:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            MoreData:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([{load:true}]),

            loadMore:false,
            isRefreshing:false,
            loaded:false,

            MemberType: Number(this.props.MemberType)  || 0,
            TodayNeedConnect:0,
            orderType:-1,
            sortName:'',
            IntentLevel:0,
            TJStartTime:'',
            TJEndTime:'',
            YYStartTime:'',
            YYEndTime:'',
            ClueType:0,//机会类型，默认0全部
            ProductId:0,

            // MemberType:0,
            // sortNum:0,
            // IntentLevel:0,
            //分类弹框选项
            KindData:[
                    {
                        'MemberTypeName':'全部',
                        'MemberTypeCount':'0',
                        'MemberType':'0'
                    },
                    {
                        'MemberTypeName':'待跟进',
                        'MemberTypeCount':'0',
                        'MemberType':'1'
                    },
                    {
                        'MemberTypeName':'跟进中',
                        'MemberTypeCount':'0',
                        'MemberType':'2'
                    },
                    {
                        'MemberTypeName':'今日预约',
                        'MemberTypeCount':'0',
                        'MemberType':'3'
                    },{
                      'MemberTypeName':'未及时跟进',
                      'MemberTypeCount':'0',
                      'MemberType':'5'
                  }],
            IntentLevelData:[{
                  level:'极高',
                  id:'3'
              },
              {
                  level:'高',
                  id:'2'
              },
              {
                  level:'一般',
                  id:'1'
              }],

        }
    }
    componentDidMount(){
        // 获取用户信息
        AsyncStorage.getItem(TOKEN_NAME).then( (storeData) => {
            storeData = JSON.parse(storeData);
            this.setState({
                storeData:storeData
            },()=>{
                setTimeout(()=>{
                  this.getSaleCuleData();
                },300);
            });
        });
    }
    //卸载后清除时间
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer2 && clearTimeout(this.timer2);
    }

    backToMain() {
        this.props.navigator.pop();
    }
    //销售机会列表
    getSaleCuleData() {
        let getSaleCuleUrl = VipSaleListAPI.get({
            Token: this.state.storeData.Token,
            JobNum:this.state.storeData.JobNumber,
            Mobile:this.state.searchPhone,
            Name:this.state.searchName,
            SaleClueType:this.state.MemberType == 6 ? 0 : this.state.MemberType,
            TodayNeedConnect:this.state.TodayNeedConnect,
            CreateTimeStart:this.state.TJStartTime || '0001-01-01 00:00:00',
            CreateTimeEnd:this.state.TJEndTime || '0001-01-01 00:00:00',
            ReservationTimeStart:this.state.YYStartTime || '0001-01-01 00:00:00',
            ReservationTimeEnd:this.state.YYEndTime || '0001-01-01 00:00:00',
            OrderType:this.state.orderType,
            OrderName:this.state.sortName,
            PageIndex:this.state.PageIndex,
            PageSize:5,
            IntentLevel:this.state.IntentLevel || 0,
            ClueType:this.state.ClueType,
            ProductId:this.state.ProductId,
        });

        talkingData('xg_event_vip_chance_list','',{'employee':this.state.storeData.JobNumber,'error':''});

        XGFetch(getSaleCuleUrl,(json) => {
          let result = null;
          try {
              result = JSON.parse(json.result);
          } catch (e) {
              result = {};
          }
          // 出现错误
          if (json.gwerror > 0) {
              this.handleError();
              talkingData('xg_fail_vip_chance_list','',{'employee':this.state.storeData.JobNumber,'error':'gwerror > 0'});
              return;
          }
          if(result.ResCode != 1000){
              this.setState({isRefreshing: false,loaded: true});
              ToastShow('程序异常:'+result.ResCode);
              talkingData('xg_fail_vip_chance_list','',{'employee':this.state.storeData.JobNumber,'error':result.ResMsg});
          }
          // console.log(result);
          var PageCount=Math.ceil(result.RecordCount/5);
          var memberList=result.Data ? result.Data : [];
          this.setState({
              loadMore:PageCount>1,
              resCount:memberList.length,
              PageCount:PageCount,
          })
          if(memberList.length<=0){
              this.setState({resCount:0})
          }
          this.timer = setTimeout(() =>{
              this.setState({
                  loaded:true,
                  recordData:this.state.recordData.cloneWithRows(this._linkCallList(memberList)),
              });
          }, 150);
          //不知道为什么要这么做，但是不做下拉刷新两个组件切换时会死。
          this.timer2 = setTimeout(() =>{
              this.setState({isRefreshing: false,});
          }, 250);
        }, (err) => {
          this.handleError(err);
          talkingData('xg_fail_vip_chance_list','',{'employee':this.state.storeData.JobNumber,'error':'网络异常'});
        })
    }
    //处理错误
    handleError(err){
        this.setState({isRefreshing: false,loaded: true});
        if(this.state.PageIndex > 1){
            this.setState({
                MoreData:this.state.MoreData.cloneWithRows(this.state.resList.concat([{netErr:true}])),
            })
        }else{
          if(err == FetchResult.TIMEOUT){
              ToastShow('网络请求超时，请稍后再试');
          }else if(err == FetchResult.NETWORKERR){
              ToastShow('没有网络连接，请稍后再试');
          }else{
              ToastShow('网络异常，请稍后再试');
          }
        }
    }
    //连接数据
    _linkCallList(data){
        if(!this.state.resList){
            var newData = data;
        }
        else{
            var oldData= this.state.resList;
            var newData = oldData.concat(data);
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
    //搜索文本框发生变化
    handleChange() {

    }
    getSearchRef(component) {
        this.searchRef = component;
    }
    //清空文本框
    clearInput(){
        this.searchRef && this.searchRef.clear();
    }

    //下拉刷新
    _onRefresh() {
        this.setState({
            resList:null,
            isRefreshing:true,
            PageIndex:1,
        },()=>{
          //刷新数据
          this.getSaleCuleData();
        })
    }
    //下拉加载
    _endReach(){
        //不满一屏继续加载
        console.log(this.state.PageIndex,this.state.PageCount);
        if(this.state.PageIndex < this.state.PageCount){
            this.setState({
                PageIndex:this.state.PageIndex+1,//页标
                loadMore:true,
            },()=>{
              this.getSaleCuleData();
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
          this.getSaleCuleData();
        })
    }
    //渲染销售机会列表
    renderChanceList(){
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
                <MySaleChanceList
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    recordData={this.state.loadMore ? this.state.MoreData : this.state.recordData}
                    endReached={this._endReach.bind(this)}
                    getScrollViewRef={this.getScrollViewRef.bind(this)}
                    storeData={this.state.storeData}
                    retryData ={this.netErrRefreshData.bind(this)}
                    navigator={this.props.navigator} />
                );
        }
    }
    /*类别点击*/
    _kindChoose(){
        //按钮active
        this.setState({
            isKindActive:true,
            isSortActive:false,
            isFilterActive:false,

            MemberType:1,
            sortNum:0,
            IntentLevel:0,
        });
    }
    /*排序点击*/
    _sortChoose(){
        //按钮active
        this.setState({
            isKindActive:false,
            isSortActive:true,
            isFilterActive:false,

            MemberType:0,
            sortNum:1,
            IntentLevel:0,
        })
    }
    /* 筛选点击*/
    _filterChoose(){
        //按钮active
        this.setState({
            isKindActive:false,
            isSortActive:false,
            isFilterActive:true,

            MemberType:0,
            sortNum:0,
            IntentLevel:1,
        });
    }
       
    /*渲染类别窗口*/
    _renderKindDialog(){
        if(this.state.isKindActive){
            return(
                <Dialog
                    cancelPress={this._cancelPress.bind(this)}
                    dialogStyle={styles.sortDialog}
                    content={this._kindContent()} />
                );
        }
        return;
    }
    /*渲染排序窗口*/
    _renderSortDialog(){
        if(this.state.isSortActive){
            return(
                <Dialog
                    cancelPress={this._cancelPress.bind(this)}
                    dialogStyle={styles.sortDialog}
                    content={this._sortContent()} />
                );
        }
        return;
    }
    /*渲染筛选窗口*/
    _renderfilterDialog(){
        if(this.state.isFilterActive){
            return(
                <Dialog
                    topGroup
                    confirmPress={this._filterConfirm.bind(this)}
                    cancelPress={this._cancelPress.bind(this)}
                    resetPress={this._resetPress.bind(this)}
                    dialogStyle={styles.sortDialog}
                    content={this._filterContent()} />
                );
        }
        return ;
    }
    _filterConfirm(){
        this.setState({
            resList:null,
            PageIndex:1,
            loadMore:false,
            isFilterActive:false,
        },()=>{
          // this.getSaleCuleData();
        })

        talkingData('xg_action_chance_filter','',{'employee':this.state.storeData.JobNumber,'error':''});
    }
     _resetPress(){
         
    }
    //渲染类别内容
    _kindContent(){
        let kindData=this.state.KindData;
        return(
                <View>
                    <View style={styles.kindCon}>
                        {kindData.map((item,i)=>{
                            let ItemCount = item.MemberTypeCount;
                            return(
                                    <TouchableWithoutFeedback key={i} >
                                        <View style={{position:'relative',height:50}}>
                                            <View style={styles.kindItemFocus} >
                                                <Text style={styles.kindTxtFocus}>{item.MemberTypeName}</Text>
                                            </View>
                                           <View style={styles.kindNumTxt}><Text style={{color:'#fff'}}>{ItemCount}</Text></View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                        })}
                    </View>
                </View>
                )
    }
    //渲染sort内容
    _sortContent(){
        return(
            <View style={{flex:1}}>
                <TouchableWithoutFeedback>
                    <View style={styles.sortLine}>
                        <Text style={this.state.sortNum == 0 ? {color:'#3ac569',marginRight:20} : {marginRight:20}}>默认</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.sortLine}>
                        <Text style={this.state.sortNum == 1 ? {color:'#3ac569'} : {marginRight:20}}>最后跟进时间</Text>
                        {
                          this.state.sortNum == 1 ? <Image
                            style={styles.orderIco}
                            source={this.state.orderType == 1 ? require('../../images/upIcon.png') : require('../../images/downIcon.png')} /> : null
                        }
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.sortLine}>
                        <Text style={this.state.sortNum == 2 ? {color:'#3ac569'} : {marginRight:20}}>提交时间</Text>

                        {
                          this.state.sortNum == 2 ? <Image
                            style={styles.orderIco}
                            source={this.state.orderType == 1 ? require('../../images/upIcon.png') : require('../../images/downIcon.png')} /> : null
                        }
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={styles.sortLine}>
                        <Text style={this.state.sortNum == 3 ? {color:'#3ac569'} : {marginRight:20}}>预约时间</Text>
                        {
                          this.state.sortNum == 3 ? <Image
                            style={styles.orderIco}
                            source={this.state.orderType == 1 ? require('../../images/upIcon.png') : require('../../images/downIcon.png')} /> : null
                        }
                    </View>
                </TouchableWithoutFeedback>
            </View>
            );
    } 
    /*渲染筛选内容*/
    _filterContent(){
        return(
                <ScrollView>
                    <Text style={{fontSize:16,color:'#333',marginLeft:15,marginTop:15}}>意向大小</Text>
                    <View style={styles.kindCon}>
                        {
                            this.state.IntentLevelData.map((item,i)=>{
                                return(
                                    <TouchableWithoutFeedback key={i}>
                                        <View style={{position:'relative',height:50,}}>
                                            <View style={[styles.kindItemFocus,{width:(winWidth-52)/3}]} >
                                                <Text style={styles.kindTxtFocus}>{item.level}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                        }
                    </View>
                </ScrollView>
              )
    }
    /*取消弹窗*/
    _cancelPress(){
        this.setState({
            isKindActive:false,
            isFilterActive:false,
            isSortActive:false,
        });
    }

    _renderBottomBar() {
        return(
            <View style={styles.bottomBar}>
                <TouchableWithoutFeedback onPress={this._kindChoose.bind(this)}>
                    <View style={styles.bar}>
                        <View style={{position:'relative'}}>
                            <Image
                              style={styles.barIcon}
                              source={this.state.MemberType == 0 ? KIND_NORMAL : KIND_FOCUS} />
                        </View>
                        <Text style={this.state.MemberType == 0 ? {fontSize:10,color:'#333'} : {fontSize:10,color:'#3ac569'}}>类别</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._sortChoose.bind(this)}>
                    <View style={styles.bar}>
                        <Image
                          style={styles.barIcon}
                          source={this.state.sortNum == 0 ? SORT_NORMAL : SORT_FOCUS} />
                        <Text style={this.state.sortNum == 0 ? {fontSize:10,color:'#333'} : {fontSize:10,color:'#3ac569'}}>排序</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._filterChoose.bind(this)}>
                    <View style={styles.bar}>
                        <Image
                          style={styles.barIcon}
                          source={this.state.TJStartTime != '' || this.state.TJEndTime != '' || this.state.YYStartTime != '' || this.state.YYEndTime != '' || this.state.IntentLevel != 0 ? FILTER_FOCUS:FILTER_NORMAL} />
                        <Text style={this.state.TJStartTime != '' || this.state.TJEndTime != '' || this.state.YYStartTime != '' || this.state.YYEndTime != '' || this.state.IntentLevel != 0 ?{fontSize:10,color:'#3ac569'} : {fontSize:10,color:'#333'}}>筛选</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
            )
    }

    render() {
        return(
            <View style={styles.pageStyle}>
                <View>
                    <HeadNavBar
                        title="我的销售机会"
                        leftIcon={IconData.newBackIcon}
                        leftIconPress={this.backToMain.bind(this)} />
                </View>
                <View style={{marginBottom:10}}>
                    <Search placeholder='输入客户姓名/手机号'
                        onCge={this.handleChange.bind(this)}
                        getSearchRef = {this.getSearchRef.bind(this)}
                        searchName = {this.state.searchName}
                        searchPhone = {this.state.searchPhone}
                        clearInput = {this.clearInput.bind(this)} />
                </View>
                {
                    !this.state.loaded ? (<View style={{height:300,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                            <Loading />
                                          </View>)
                    : <View style={{flex:1,marginBottom:50}}>
                        { this.renderChanceList() }
                      </View>
                }  
                { this._renderBottomBar() } 
                { this._renderKindDialog() }
                { this._renderSortDialog() }
                { this._renderfilterDialog() }
            </View>
                
            )
    }
}

const winWidth  = WinStyle.WinWidth,
      winHeight = (WinStyle.WinHeight);

const styles = StyleSheet.create({
    pageStyle: {
        flex:1,
        backgroundColor: WinStyle.PageBGColor
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
    bottomBar: {
        height:50,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent: 'space-around',
        borderTopWidth:StyleSheet.hairlineWidth,
        borderColor:'#ddd',
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
    },
    bar: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    barIcon:{
        width: 22,
        height: 22,
        resizeMode: 'stretch',
        marginTop: 3,
        marginBottom:3,
    },
    //类别弹框
    sortDialog:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        padding:0,
        margin:0,
        borderRadius:0,
        width:winWidth,
    },
    kindCon:{
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
    },
    kindItemFocus:{
        borderWidth:1,
        borderColor:'#3ac569',
        backgroundColor:'#e4f7ea',
        width:(winWidth-52)/3,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        borderRadius:3,
        position:'relative',
    },
    kindNumTxt:{
        position:'absolute',
        right:0,
        top:0,
        backgroundColor:'#ff674b',
        width:20,
        height:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    sortLine:{
        height:45,
        borderTopWidth:StyleSheet.hairlineWidth,
        borderColor:'#eee',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // borderWidth:1,
        // borderColor:'#000'
    },
    orderIco: {
        width:20,
        height: 14,
        marginTop: 2,
        resizeMode:'contain'
    },
})