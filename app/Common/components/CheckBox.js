'use strict';
import React, { Component,PropTypes } from 'react';

import {
    View,
    Text,
    Image,
    resizeMode,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const checkAtIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABtUlEQVRYR+2ZzXHCMBCF3yMFJKWkg8DVUEQ4xKELTBeQSygi4RrogE4CBYTNyMEOP5YlW7IMM3CAGXvt/eZJ7Fuvif1HRoMuRMYQPIJ4yI4H/RVsQKxBTjj9WKrcVF8SRwnIcVAYUzKRCd8WCffKfZniWzlP9ihxtAT51AqAKanIihL3v1vbc0ZAbCivfTHFtXn+Buiq/k1Bo4IiW5D3urh2FaQM8aOcA6rUFUK2B0gZcrqYp072Eil7LYRsB/AALu8FNHYbHrAIbhQ9Q/hetA/DAlaES7uZYE5SAy4cYE24MIAOcPaAhmKqLcaOcHaAFsW0ENADnBnQspieAXqCMwEuOfvsHSYvq/h5nEc4E6AyoTlni6E1pGc4C8DUKe0gG4CzBLSAbAiuAmAJ5B0es64kN/4SbzX2hycBFa3ufLlPE4pHuIoK5vqc7ckmlMvuWVFBPaRv5RwBj/dkU3A1l/ioKs5BrHTNZtU/RFF8zSX2kdruHjdAO530UVegYBxtyp7sXRVwul5kewUDzL/h+eWOgNOSe8lD9H8fHXSx2yWAeg2hnzY57SnTxerhDFij00my1xC/jgpJ2qD+mOkAAAAASUVORK5CYII=',
      checkNoIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABjUlEQVRYR+2ZwVHDMBBFd+UZ5Ug6iKmAdAAdECogPkk3oAJIB9xsnRw6MB0kFSR0EDqAY3JZZj1yxjCTSYYdbA6rk8bS13497ekboTXyPE+TJBkR0VX7e1dzIloPBoNllmUfTU3kSVmWw91udwcA9wAw7MrQgTps7tk5N+P12mBRFCUiTns29q08Ec299xnmeT41xpRx9Z0pWmsXbcxdGOf2MsaMmR4AjGLNGwwhrACAFz6ttWnXxn5ePhpdA8AZEb2yQYqbXpxz/+KZi6KoEPG67sGWwZlz7qmL5zxWI4TAPh7V4DFSh9aV4G/JNTolqASlBKR67UElKCUg1WsPKkEpAalee1AJSglI9dqDSlBKQKrXHlSCUgJSfQhhDgC3TTaz4TyOiDbe+3Pp4VI9p73b7XaFiCkRvXG6tU+SAKCy1mZ9ZYQxiuYwdRIv+oDR8QIRL1q3XxPRPsiWUjlRnzK1Zi/T896P64w6ppr87pcnHvbX25bW2gm/ZG2wGTGv5lv09hsCERfOuarx9AX0A1pKcZS4GgAAAABJRU5ErkJggg==';


export default class CheckBox extends Component {
    constructor(props){
      super(props);
      this.state={
          checkData:this.props.check_props,
          checkAtIcon : this.props.checkAtIcon || checkAtIcon,
          checkNoIcon : this.props.checkNoIcon || checkNoIcon,
      }
    }


    handleClick(i){
        var myData = this.state.checkData;
        myData[i].selected = !myData[i].selected;
        this.setState({checkData : myData},()=>{
          var selectedArr = [];
          myData.map((item,i)=>{
            item.selected && selectedArr.push({ label: item.label, value: item.value, selected: true });
          });
          this.props.onClick(selectedArr);
        });
    }

    renderCheckBtn(option,i){
      return (
            <TouchableOpacity activeOpacity={1} style={{marginRight:10,height:this.props.btnHeight || 44}} onPress={this.handleClick.bind(this,i)} key={i}>
                <View style={{flexDirection:'row',height:this.props.btnHeight || 44,justifyContent:'center',alignItems:'center'}}>
                  <Image style={[styles.checkSquare,this.props.iconStyle]} source={{uri:this.state.checkData[i].selected ? this.state.checkAtIcon : this.state.checkNoIcon}} />
                  <Text style={[styles.labelTxt,this.props.labelStyle]} >{option.label}</Text>
                </View>
            </TouchableOpacity>
      );
    }

    render(){
      let checkbtns = this.state.checkData.map((option,i) => {
          return (this.renderCheckBtn(option,i));
      });
      return(
          <View style={styles.check}>
              {checkbtns}
          </View>
      );
    }
}


const styles = StyleSheet.create({
  check:{
      flex:1,flexDirection:'row',flexWrap:'wrap',
  },
  checkSquare:{
    width:20,
    height:20,
    resizeMode:'cover',
    marginRight:2
  },
  labelTxt:{
      fontSize:12,
      color:'#000',
  },
})
