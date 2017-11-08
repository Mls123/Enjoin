import React, { Component } from 'react';
import { 
  AppRegistry, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight,
  Keyboard,
  ScrollView,
} from 'react-native';

import SearchBar from 'react-native-searchbar';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

import MenuPage from './MenuPage';
import Authentication from './Authentication';
import ProfilePage from './ProfilePage';

const items = [
  'Espresso House Frederiksberg',
  'Baresso Frederiksberg',
  'Starbucks Frederiksberg',
  'Espresso House Hundige',
  'Espresso House Bornholm',
  'Karens super kaffe',
];

class searchPage extends Component {
      
  constructor(props) {
    super(props);
    this.state = {
      items,
      results: [],
      hideBack: true,
    };
    this._handleResults = this._handleResults.bind(this);
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

  render() {
    Keyboard.dismiss(); 
        return (
               
         <View style={{ marginTop: 50 }}>
         
          <View style={{ marginTop: 55, marginLeft: 20, marginRight: 20, borderRadius: 10, backgroundColor: '#e0e9fc', borderColor:'grey', borderWidth:0.5 }}>
            
            {
              this.state.results.map((result, i) => { 
                 
                return ( 
    
                  <TouchableHighlight 
                      key={i} 
                      underlayColor='#d7dce8'
                      style={{borderRadius: 10}} 
                      onPress={() => this.onPress(result)} >
                    
                    <Text style={{fontSize: 15, height: 30, marginTop: 15, marginLeft: 15 }}>
                      {typeof result === 'object' && !(result instanceof Array) ? 'object' : result.toString()}
                    </Text>
                    
                  </TouchableHighlight>
                 
                );
              })    
            }
            
            <Button
                onPress={() => this._profileBtnPressed()}
                title="   See your profile   "
                color="#4dd2ff"
            />

            </View>
        
        <SearchBar 
            ref={(ref) => this.searchBar = ref}
            data={items}
            handleResults={this._handleResults}
            showOnLoad
            hideBack= {this.state.hideBack}
        />  
    </View>
        );
      }
    }
    
module.exports = searchPage; 