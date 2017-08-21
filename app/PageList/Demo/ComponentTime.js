import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { IconData } from '../../Common/styles/IconBase';
import HeadBar from '../../Common/components/HeadBar';

export default class MyPropType extends Component {
    constructor(props){
        super(props);
        this.state = {
            stateName: this.props.myName + ',xhh',
            count: 0,
        }
    console.log('init-constructor');
    }
    static propTypes = {
        myName: PropTypes.string,
        age: PropTypes.number,
        // sex: PropTypes.string.isRequired
        sex: PropTypes.string
    }
    static get defaultProps() {
        return {
            myName: "xhh",
            age: 18
        }
    }
    doUpdateCount(){
        this.setState({
            count: this.state.count+1
        })
    }
    componentWillMount() {
      console.log('componentWillMount');
    }
    componentDidMount() {
      console.log('componentDidMount')
    }
    componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps')
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        // return nextProps.id !== this.props.id;
        if(nextState.count > 10) return false;
        return true;
    }
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render(){
        console.log('render');
        return (
        <View style={{flex:1,alignItems:'center'}}>
            <HeadBar
                    title="组件生命周期"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.props.navigation.goBack()}} />
            <Text style={{marginTop:20}}>姓名：{this.props.myName}</Text>
            <Text>别名：{this.state.stateName}</Text>
            <Text>年龄：{this.props.age}</Text>
            <Text>性别：{this.props.sex}</Text>
            <Text>父元素计数是:{this.state.count}</Text>
            <TouchableOpacity onPress={ this.doUpdateCount.bind(this) } style={{ padding: 5,backgroundColor: '#ccc' }}>
                <Text>点我开始计数</Text>
            </TouchableOpacity>
            <SubMyPropType count1={this.state.count} />
        </View>
        )
    }
}
class SubMyPropType extends Component {
    componentWillReceiveProps(nextProps){
      console.log('subMyPropType-componentWillReceiveProps')
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('subMyPropType-shouldComponentUpdate');
        // return nextProps.id !== this.props.id;
        if(nextProps.count1 > 5) return false;
        return true;
    }
    componentWillUpdate(){
        console.log('subMyPropType-componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('subMyPropType-componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('subMyPropType-componentWillUnmount');
    }
    render(){
        console.log('subMyPropType-render');
        return(
                <Text>子元素计数是:{this.props.count1}</Text>
            ) 
    }
}

// init-constructor
// componentWillMount
// render
// subMyPropType-render
// componentDidMount

//子元素和父元素都在计时
// shouldComponentUpdate
// componentWillUpdate
// render
// subMyPropType-componentWillReceiveProps
// subMyPropType-shouldComponentUpdate
// subMyPropType-componentWillUpdate
// subMyPropType-render
// subMyPropType-componentDidUpdate
// componentDidUpdate

//子元素停止计时(count1 > 5)
// shouldComponentUpdate
// componentWillUpdate
// render
// subMyPropType-componentWillReceiveProps
// subMyPropType-shouldComponentUpdate
// componentDidUpdate

//父元素也停止计时
// shouldComponentUpdate

// 生命周期                 调用次数            能否使用setSate()
// getDefaultProps             1(全局调用一次)       否
// getInitialState             1                     否
// componentWillMount          1                     是
// render                      >=1                   否
// componentDidMount           1                     是
// componentWillReceiveProps   >=0                   是
// shouldComponentUpdate       >=0                   否
// componentWillUpdate         >=0                   否
// componentDidUpdate          >=0                   否
// componentWillUnmount        1                     否 