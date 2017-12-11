import React, {Component} from 'react';
import {StyleSheet, Button, AsyncStorage, Alert, Keyboard, Text, View, AppRegistry, FlatList, leftText, ScrollView} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import * as firebase from 'firebase';
import Authentication from './Authentication';

//const DEMO_SHOP_1 = ['Frederiksberg Espresso House'];

class OrderView extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      uid: '',
      orders: [],
      ready: 'finished',
      loading: false,
      error: '',
      items: [],
    };
    this.orderRef = firebase.database().ref().child('Orders');
   }

  _backBtn(){
    Keyboard.dismiss();
    try {
      AsyncStorage.removeItem('id_token');
      Alert.alert('Log Out Successfully!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  componentDidMount() {
    let user = firebase.auth().currentUser; 
    this.ListenForOrders(this.orderRef.child(user.uid));
    this.setState({uid: user.uid});
    
  }

  ListenForOrders(orderRef){
    orderRef.on('value', (snap) => {
      var order = []; 
      var items = [];
        snap.forEach((child) => {
          child.forEach((order) => {
            items.push({
              UIDorders: child.key,
              productName: order.key,
              productAdd: child.val().addOn,
              productShop: order.key,
              toGo: order.key,
              time: order.key,
              ready: order.key, 
            });
        });
        this.setState({ items: items, orders: order });
        console.log(this.state.orders);
        console.log(this.state.items);
    });
  })
  }

  updateOrder() {
    this.setState({ loading: true });
    this.orderRef.child(this.state.orders).update({
      ready: this.state.ready,

    })
    .then(() => {
      this.setState({ loading: false });
    })
    .catch((err) => {
      this.setState({ 
        error: 'Update failed. '+err,
        loading: false
      });
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <CheckBox onPress={this.updateOrder.bind(this)} label='Ready'></CheckBox>;
  }

  render(){

    return(
      <View style={{marginTop: 40}}> 

        <Button
            style={{width: 60}}
            onPress={() => this._backBtn()}
            title="   Log ud   "
        />

    <ScrollView>

        <Text style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: 30, paddingTop: 30, fontSize: 20, /*position: 'absolute'*/}}>
        {'Espresso House Frederiksberg'} 
        </Text>
        

        <View>
          <Text style={styles.title}>{'Order 1'} </Text>
          <Text style ={styles.body}>{'Coffe black'} </Text>
          <Text style ={styles.body}>{' - Sugar'} </Text>
          <Text style ={styles.body}>{'\nI will be there in 7'} </Text>
          <Text style ={styles.body}>{'To Go'} </Text>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
          
        </View>

        <View>
          <Text style={styles.title}>{'Order 2'} </Text>
          <Text style ={styles.body}>{'Coffe black'} </Text>
          <Text style ={styles.body}>{'Cake'} </Text>
          <Text style ={styles.body}>{' - whipped cream'} </Text>
          <Text style ={styles.body}>{'\nStay'} </Text>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
          
        </View>
        
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