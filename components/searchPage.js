import React, { Component } from 'react';
import { 
  AppRegistry, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight,
  Keyboard,
  ScrollView,
  Button,
} from 'react-native';

import SearchBar from 'react-native-searchbar';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

import MenuPage from './MenuPage';
import Authentication from './Authentication';
import ProfilePage from './ProfilePage';

var items = [
 //'Espresso House Bla'
]; 

class searchPage extends Component {
      
  constructor(props) {
    super(props);
    this.state = {
      shops,
      results: [],
      hideBack: true,
    };
    this._handleResults = this._handleResults.bind(this);
    this.shopRef = firebase.database().ref().child('Shops');
  }

  _handleResults(results) {
    this.setState({ results });   
    
  }

  onPress(result){
    console.log('Result: '+result)
    Keyboard.dismiss(); 
    Actions.MenuPage({title: result}); 
  }
  _profileBtnPressed(){
    Actions.ProfilePage();
  }

  componentDidMount() {
    this.listenForItems(this.shopRef);
    
  }

  listenForItems(shopRef) {
    shopRef.on('value', (snap) => {

      // get children as an array
      var item = [];
      snap.forEach((child) => {
        item.push({
          title: snap.val().title,
          _key: child.key
        });
      });
      this.setState({ items: item });

    });
  }

  render() {
    
        return (
               
         <View style={{ marginTop: 50 }}>
         
          <View style={{ marginTop: 55, marginLeft: 20, marginRight: 20, borderRadius: 10, backgroundColor: '#e6ffff', borderColor:'#000000', borderWidth:0.5 }}>
            
            {
              this.state.results.map((result, i) => { 
                 
                return ( 
    
                  <TouchableHighlight 
                      key={i} 
                      underlayColor='#99ffff'
                      style={{borderRadius: 10}} 
                      onPress={() => this.onPress(result)} >
                    
                    <Text style={{fontSize: 15, height: 30, marginTop: 15, marginLeft: 15 }}>
                      {typeof result === 'object' && !(result instanceof Array) ? 'object' : result.toString()}
                    </Text>
                    
                  </TouchableHighlight>
                 
                );
              })    
            }

            </View>
        
        <SearchBar 
            ref={(ref) => this.searchBar = ref}
            data={items}
            handleResults={this._handleResults}
            showOnLoad
            hideBack= {this.state.hideBack}
            focusOnLayout = {false}
        />  

        <View
        style={{marginTop: 400, padding: 20}}>

            <Button 
                onPress={() => this._profileBtnPressed()}
                title="   See your profile   "
                color="#4dd2ff"
            />
        </View>

    </View>
        );
      }
    }
    
module.exports = searchPage; 