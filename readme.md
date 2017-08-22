### 样式
```js
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
```

### 宽度与高度
#### flexbox布局(flexDirection、alignItems和 justifyContent)
* 指定宽高
 * 最简单的给组件设定尺寸的方式就是在样式中指定固定的width和height。React Native中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。
* 弹性(Flex)宽高
 * 我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间。如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大。
* react native没有宽高100%的设置，所以如果需要让元素撑满屏幕，需要：
 * 
 ```js
import { Dimensions, View } from 'react-native';
<View style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height}} />
```

### 状态state
```js
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
```

### 属性props 
* 以开关组件为例

### 组件生命周期

### 列表
* ScrollView
* ListView

### 封装组件
- AnimateNumber
- CheckBox
- Progress
- Radio
- RateStar

### react-navigation
- StackNavigator
- TabNavigator