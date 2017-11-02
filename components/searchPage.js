import React, { Component } from 'react';
import { AppRegistry, Picker, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import SearchBar from 'react-native-searchbar';
import {Actions} from 'react-native-router-flux';
import Authentication from './Authentication';
import * as firebase from 'firebase';
import MenuPage from './MenuPage';

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
    Actions.MenuPage({title: result}); 
  }

  render() {
        return (
                   
         <View style={{ marginTop: 50 }}>

          
          <View style={{ marginTop: 75, marginLeft: 10 }}>
            {
              this.state.results.map((result, i) => { 
                 
                return ( 
                  
                  <TouchableHighlight key={i} onPress={() => this.onPress(result)} >
                    
                    <Text>
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
            
          />
          
        </View>
        
        );
      }
    }
module.exports = searchPage; 