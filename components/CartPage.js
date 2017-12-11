import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
  FlatList, 
  TextInput,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Switch from 'react-native-customisable-switch';
import * as firebase from 'firebase';
import SearchPage from './SearchPage';
import MenuPage from './MenuPage';
import Authentication from './Authentication';

class CartPage extends Component {
    
        constructor(props) {
            super(props);
            this.state = { 
              orders: [],
              menu: [],
              toStay: false,
              uid: '',
              error: '',
              name: 'Write pick up time',
              equalPrice: 0,
              ready: '',
            }

            this.orderRef = firebase.database().ref().child('Orders');
            };

      componentDidMount() {
        let shop = this.props.title;
        let user = firebase.auth().currentUser; 
        //indsæt shop som første tabel?
        this.ListenForOrders(this.orderRef.child(user.uid));
        this.setState({uid: user.uid});
        
      }

      ListenForOrders(orderRef){
        orderRef.on('value', (snap) => {
          var orders = [];
          var menu = [];
          snap.forEach((child) => {
            child.forEach((order) => {
                orders.push({
                    UIDorders: child.key,
                    productName: order.key,
                    productAdd: order.val().addOn,
                    productShop: order.key,
                    toGo: order.key,
                    time: order.key,
                    ready: order.key,
                    
                });
            });
            
            menu.push(child.key);
          });
          this.setState({ orders: orders, menu: menu });

        })
      }
           
    onPress(orderRef){

      var orderRef1 = this.orderRef; 
      var uid1 = this.state.uid; 
      var toStay1 = this.state.toStay; 
      var name1 = this.state.name;
      var ready1 = this.state.ready;

      this.props.inCart.map(function(product){
        
      console.log(product.name, product.addOns);
        
      orderRef1.child(uid1).push({
        productName: [product.name],
        productAdd: [product.addOns],
        productShop: product.shop,
        toGo: toStay1, 
        time: name1,
        ready: 'Started',
      });
      })

      Alert.alert( 'Congratz with the caff');
      Actions.SearchPage(); 

    }
    _BackPressed(){
      Actions.MenuPage();
    }
    _Logud(){
      try {
        AsyncStorage.removeItem('id_token');
        Alert.alert('Log Out Successfully!');
        Actions.Authentication();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
  
    }
        render(){
            return(
              <View>
                
                <ScrollView>

                <View style={{padding:10, flexDirection: 'row', marginTop: 40, width:360, justifyContent: 'space-between'}}>
                        
                <Button
                    title="     back     "
                    onPress={() => this._BackPressed()}
                />
                <Button 
                    onPress={() => this._Logud()}
                    title="    Log ud    "
                />
                </View>

                  <Text style={{fontWeight: 'bold', textAlign: 'left', fontSize: 20, paddingTop: 20, paddingLeft: 20}}>
                  {'Order: '} 
                  </Text>

                <View style={{flex: 1, flexDirection: 'row',
              justifyContent: 'space-between', width: 350, padding: 20}}>

                  <Switch
                          style={{paddingLeft: 20, paddingBottom: 10}}
                          defaultValue={false}
                          activeText={'Stay'}
                          inactiveText={'To Go'}
                          fontSize={15}
                          activeTextColor={'rgba(255, 255, 255, 1)'}
                          inactiveTextColor={'rgba(255, 255, 255, 1)'}
                          activeBackgroundColor={'rgba(137, 137, 137, 1)'}
                          inactiveBackgroundColor={'rgba(50, 163, 50, 1)'}
                          activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                          inactiveButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                          switchWidth={100}
                          switchHeight={35}
                          switchBorderRadius={5}
                          switchBorderColor={'rgba(0, 0, 0, 1)'}
                          switchBorderWidth={0}
                          buttonWidth={25}
                          buttonHeight={30}
                          buttonBorderRadius={10}
                          buttonBorderColor={'rgba(0, 0, 0, 1)'}
                          buttonBorderWidth={0}
                          animationTime={150}
                          padding={true}
                          onChangeValue={(value) => {
                            this.setState.toStay
                          }}
                          />

                        <TextInput
                          style={{height: 35, borderColor: 'gray', borderWidth: 1, textAlign: 'left', width: 190}}
                          onChangeText={(name) => this.setState({name})}
                          value={this.state.name}
                        />
                    </View>
                  

                  {
                  this.props.inCart.map(function(product){
                    return(
                       
                  <View>

                      <View style={styles.doubleContainer} >

                    <Text style ={styles.body}>{product.name + '\n    ' + product.addOns} </Text>
                    <Text style ={{paddingTop: 10, fontWeight: "200", fontSize: 18, }} >{product.price} </Text>
                    <Text style ={{paddingTop: 10, fontWeight: "200", fontSize: 20, paddingTop: 50, textAlign: 'right' }} >{product.price++} </Text>
               
                      
                      </View>
                  </View>

                    );
                  })
                }
                
                
                  </ScrollView>
                  
                  <TouchableHighlight onPress={() => this.onPress()} >
                    <View style={{height: 250, width: 350, alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>
                                          
                          <Image
                            source={{uri: 'https://www.version2.dk/sites/v2/files/styles/large/public/mobile-pay-450x362.jpg?itok=ZU6kdwOz'}}
                            style={{height: 200, width: 300, borderRadius: 10}}
                            />
                        
                      </View>
                    </TouchableHighlight>

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
              fontSize: 18,
              paddingLeft: 20
            },
            body: {
              fontWeight: "300",
              fontSize: 14
            },
            doubleContainer: {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              
            }
          })

module.exports = CartPage;

