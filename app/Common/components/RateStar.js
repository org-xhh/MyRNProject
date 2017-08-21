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

const STAR = require('../../images/common/ratestar.png');
const STAR_FOUCS = require('../../images/common/ratestar_f.png');

export default class RateStar extends Component {
    constructor(props){
        super(props);
        this.state={
            starfocus:this.props.initStar || 0,
        }

    }
    starClick(num){
        this.setState({
            starfocus:num
        },()=>{
            this.props.starNum(num);
        })
    }
    render() {
            return (<View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},this.props.style]}>
                        <Text style={this.props.txtStyle}>{this.props.name}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity activeOpacity={1} onPress={this.starClick.bind(this,1)}>
                                <Image
                                      style={styles.starIcon}
                                      source={this.state.starfocus < 1 ? STAR : STAR_FOUCS} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.starClick.bind(this,2)}>
                                <Image
                                      style={styles.starIcon}
                                      source={this.state.starfocus < 2 ? STAR : STAR_FOUCS} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.starClick.bind(this,3)}>
                                <Image
                                      style={styles.starIcon}
                                      source={this.state.starfocus < 3 ? STAR : STAR_FOUCS} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.starClick.bind(this,4)}>
                                <Image
                                      style={styles.starIcon}
                                      source={this.state.starfocus < 4 ? STAR : STAR_FOUCS} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.starClick.bind(this,5)}>
                                <Image
                                      style={styles.starIcon}
                                      source={this.state.starfocus < 5 ? STAR : STAR_FOUCS} />
                            </TouchableOpacity>
                        </View>
                    </View>
            );
    }
}

const styles = StyleSheet.create({
    starIcon:{
        width:22,
        height:22,
        resizeMode:'contain',
        marginLeft:10,
    }
});
