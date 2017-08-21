1.状态
constructor(props){
    super(props);
    this.state = {
        count: 0,
    }
}
doUpdateCount(){
    this.setState({
        count: this.state.count+1
    })
}
<Text>当前计数是:{this.state.count}</Text>
<TouchableOpacity onPress={this.doUpdateCount.bind(this)} style={{padding: 5,backgroundColor: '#ccc'}}>
      <Text>点我开始计数</Text>
</TouchableOpacity>
2.样式
<View>
   <Text style={[styles.bigblue, {backgroundColor: '#00f'}]}>style set</Text>
   <Text style={{color:'#f00'}}>just red</Text>
   <Text style={styles.red}>just red</Text>
   <Text style={[styles.bigblue, styles.red]}>bigblue, red</Text>
   <Text style={[styles.Container,this.props.style]}></Text>
</View>

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
3.属性 props(SwitchComp)

4.宽度与高度,flexbox布局(flexDirection、alignItems和 justifyContent)
(1)指定宽高
React Native中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

(2)弹性(Flex)宽高

(3)react native没有宽高100%的设置，所以如果需要让元素撑满屏幕，需要：
import { Dimensions, View } from 'react-native';
<View style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height}} />

5.组件生命周期

6.ScrollView,ListView