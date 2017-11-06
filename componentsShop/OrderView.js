import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, leftText, ScrollView} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import * as firebase from 'firebase';

const DEMO_PRODUCT_1 = ['2*Coffee \n', '1*Cacao '];
const DEMO_PRODUCT_2 = ['1*Ice Blend\n', '1*Cake '];

export default class OrderView extends Component {
   data=[{to: 'STAY', title: 'Order 1: ', body: DEMO_PRODUCT_1}, {to:'TO-GO', title: 'Order 2: ', body: DEMO_PRODUCT_2 }];
  
  render(){
    return(
      <View> 
    <ScrollView>
        
        <Text style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: 30, paddingTop: 30, fontSize: 20}}>
        {'Orders'} 
        </Text>
        
        <FlatList
            data={this.data}
            renderItem={({item}) => 
        <View>
          <Text style={styles.title}>{item.title} </Text>
          <Text style ={styles.body}>{item.to} </Text>
          <Text style ={styles.body}>{item.body} </Text>
          <CheckBox label='Ready'></CheckBox>
        </View>
        }

        />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent : 'center',
    marginTop: 30
  },
  title:{
    fontWeight: "800",
    fontSize: 18
  },
  body: {
    fontWeight: "200",
    fontSize: 14
  }
})

  module.exports = OrderView;