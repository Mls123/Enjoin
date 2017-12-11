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
  AppRegistry,
  AsyncStorage,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckboxGroup from 'react-native-checkbox-group';
import ImageSlider from 'react-native-elastic-image-slider';

import Authentication from './Authentication';
import CartPage from './CartPage';
import SearchPage from './SearchPage'; 

const images = [
    {
        width: 40,
        height: 20,
        uri: 'https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/91/918179/14617331-cup-coffee-beans-wooden.jpg'
    },
    {
        width: 40,
        height: 23,
        uri: 'http://beautyblog.dk/wp-content/uploads/2013/03/kaffe.jpg'
    },
    /*{
        width: 25,
        height: 23,
        uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/16178980_10154077273121861_1262380282828419730_o.jpg?oh=7dc849f61836f170fe6c6a7b64dc125e&oe=5AAEFF08'
    },
    {
        width: 40,
        height: 23,
        uri: 'http://makegoodcoffee.com/coffee-talk/wp-content/uploads/2009/01/espresso.jpg'
    },*/
  ];

class MenuPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            extras: [],
            menu: [],
            products: [],
            imgIndex: 0,
            inCart: [],
            selectedProduct: {},
            selectedAddons: []
        };
        this._handlePosition = this._handlePosition.bind(this);
        this.shopRef = firebase.database().ref().child('Shops').child(props.title).child('Catalog');
        this.extraRef = firebase.database().ref().child('addOns');
    };
        
    
  _handlePosition(imgIndex){
      this.setState({ imgIndex: imgIndex, selectedProduct: this.state.products[imgIndex] });
  }

  _handleAddOns(selected){
      this.setState({ selectedAddons: selected });
  }

  _dropdown_3_adjustFrame(style) {
    style.top -= 15;
    return style;
  }

  onPress(){
    Actions.CartPage({
        inCart: this.state.inCart
    });
  }
  onPressPlace(){
      var order = {
          name: this.state.selectedProduct.name,
          price: this.state.selectedProduct.price,
          shop: this.props.title,
          addOns: [...this.state.selectedAddons]
      };
      var inCart = [...this.state.inCart, order];
      this.setState({ inCart: inCart });
      console.log(inCart);
      console.log(this.state.inCart);
      
      Alert.alert('placed in cart!');
  }

  componentDidMount() {
    let shop = this.props.title;
    this.ListenForCatalog(this.shopRef);
    this.ListenForAddOns(this.extraRef);
  }

  ListenForAddOns(extraRef) {

    extraRef.on('value', (snap) => {

      // get children as an array
      var extra = [];
      snap.forEach((child) => {
            extra.push({
                label: child.key,
                value: child.key
            });
        });
        this.setState({ extras: extra });
    });
  }

  displayCatalog(idx, value) {
    var products = [];
    for(var key in this.state.items) {
        if(this.state.items.hasOwnProperty(key)) {
            let item = this.state.items[key];
            if(item.cat == value){
                products.push(item);
            }  
        }
    }
    this.setState({ products: products });
  }

  ListenForCatalog(shopRef) {
    shopRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      var menu = [];
      snap.forEach((child) => {
        child.forEach((product) => {
            items.push({
                cat: child.key,
                name: product.key,
                desc: product.val().Description,
                price: product.val().Price
            });
        });
        
        menu.push(child.key);
      });
      this.setState({ items: items, menu: menu });

    });
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
  _backBtn(){
    Actions.SearchPage();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.row}>
          <ScrollView ref={el => this._scrollView = el}
                      style={styles.scrollView}
                      contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={true}
                      scrollEventThrottle={1}>
                
                      <View style={{padding: 10, flex: 1, flexDirection: 'row', marginTop: 40, width:360, justifyContent: 'space-between',}}>
                        <Button
                            title="    back    "
                            onPress={() => this._backBtn()}
                        />
                        <Button 
                            onPress={() => this._Logud()}
                            title="   Log ud   "
                        />
                    </View> 

                  <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, paddingBottom: 20, paddingTop: 15}}>
                        {this.props.title}
                    </Text>
            
            <ModalDropdown ref={el => this._dropdown_3 = el}
                           style={styles.dropdown_3}
                           defaultValue = {this.state.menu[0]}
                           onSelect = {this.displayCatalog.bind(this)}
                           options={this.state.menu}
                           adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                           dropdownTextStyle={styles.dropdown_3_dropdownTextStyle}
                           dropdownTextHighlightStyle={styles.dropdown_3_dropdownTextHighlightStyle}
            />

                    <View style={{marginTop: 0, padding: 20, width: 400}}>
                        <ImageSlider
                            images={images}
                            onPositionChanged = {this._handlePosition}                          

                        />
                    </View>

                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {(this.state.products.length > 0)?this.state.products[this.state.imgIndex].name:'Select a product'}  
                        </Text>

                        <Text style={{textAlign: 'center'}}>
                                {(this.state.products.length > 0) ?this.state.products[this.state.imgIndex].desc: ''}
                        </Text>

                        <Text style={{textAlign: 'center', fontStyle: 'italic'}}>
                            {(this.state.products.length > 0) ? this.state.products[this.state.imgIndex].price: ''}  
                        </Text>

                    <Text style={{fontWeight: 'bold', paddingTop:20, paddingBottom: 10, textAlign: 'left', width: 315}}>
                        {'Choose extras:'}  
                    </Text>
                        
                        <CheckboxGroup
                            style={styles.doubleContainer}
                            callback={this._handleAddOns.bind(this)}
                            iconColor={"#00a2dd"}
                            iconSize={40}
                            checkedIcon="ios-checkbox-outline"
                            uncheckedIcon="ios-square-outline"
                            
                            //får ikke fat i data?
                            checkboxes={
                                this.state.extras
                            }
                            
                            labelStyle={{
                                color: '#333',
                                margin: 10,
                                textAlign: 'center',
                                fontSize: 15,
                            }}
                            rowStyle={{
                                flexDirection: 'row'
                            }}
                            rowDirection={"row"}
                        />
        
            <View style={styles.doubleContainer1}>
                <Button
                    title="  place in cart "
                    onPress={this.onPressPlace.bind(this)}
                />

                <Button
                //gemme index på product der skal føres videre når knap er trykket. 
                    onPress={() => this.onPress()}
                    title="   Go to cart   "
                />
            </View>
        </ScrollView>
    </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
     
  },
  row: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
    
  },
  contentContainer: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown_3: {
    width: 250,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#4dd2ff',
    color: '#fff',
    width: 170,
    textAlign: 'center',
    
  },
  dropdown_3_dropdownTextHighlightStyle: {
    backgroundColor: '#fff',
    color: '#000'
  },
  doubleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    width: 270,
  },
  doubleContainer1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: 260,
    paddingTop: 20,
  },
});

module.exports = MenuPage;