import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
  FlatList, 
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Switch from 'react-native-customisable-switch';
import * as firebase from 'firebase';
import SearchPage from './SearchPage';
import MenuPage from './MenuPage';

const DEMO_PRODUCT_1 = ['2X Coffee \n\n', '1X Cacao \n\n', '2X Chokolate Cake \n - with chesse' ];

class CartPage extends Component {
    
        constructor(props) {
            super(props);
            };
        
            data=[{ title: 'Order 1 ', body: DEMO_PRODUCT_1, price: '100 kr.'}];
            
    onPress(){
      Alert.alert( 'Tillykke med din kaff');
      Actions.SearchPage(); 
    }
    _BackPressed(){
      Actions.MenuPage();
    }

        render(){
            return(
              <View style={{marginTop: 30}}> 
                <ScrollView>
                  
                  <Button
                      style={{width: 50}}
                      onPress={() => this._BackPressed()}
                      title="   Back   "
                      color="#4dd2ff"
                  />

                  <Text style={{fontWeight: 'bold', textAlign: 'left', fontSize: 20, paddingTop: 20, paddingLeft: 20, paddingBottom: 20}}>
                  {'Indkøbskurv'} 
                  </Text>
                  
                  <FlatList
                      data={this.data}
                      renderItem={({item}) => 
                  <View>

                   <Text style={styles.title}>{item.title} </Text>

                      <View style={styles.doubleContainer}>
                      
                          <Switch
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
                          switchHeight={30}
                          switchBorderRadius={10}
                          switchBorderColor={'rgba(0, 0, 0, 1)'}
                          switchBorderWidth={0}
                          buttonWidth={25}
                          buttonHeight={25}
                          buttonBorderRadius={10}
                          buttonBorderColor={'rgba(0, 0, 0, 1)'}
                          buttonBorderWidth={0}
                          animationTime={150}
                          padding={true}
                          onChangeValue={(value) => {
                            console.log(value);
                          }}
                          />

                    <Text style ={styles.body}>{item.body} </Text>
                    <Text style ={{paddingTop: 150, fontWeight: "200", fontSize: 20, }} >{item.price} </Text>
                      </View>
                  </View>

                  }
                  />

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
              fontWeight: "200",
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

