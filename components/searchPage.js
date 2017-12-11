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
  AsyncStorage,
  Alert,
} from 'react-native';

import SearchBar from 'react-native-searchbar';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

import MenuPage from './MenuPage';
import Authentication from './Authentication';
import ProfilePage from './ProfilePage';

class SearchPage extends Component {
      
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      list: [],
      hideBack: true,
    };
    this._handleResults = this._handleResults.bind(this);
    this.shopRef = firebase.database().ref().child('Shops');
  }

  _handleResults(results) {
    this.setState({ results });   
    
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

  onPress(result){
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
      var items = [];
      snap.forEach((child) => {
        items.push(child.key);
      });
      this.setState({ list: items });
    });
  }

  render() {
    
        return (
               
         <View style={{ marginTop: 40 }}>
         
          <View style={{ marginTop: 55, marginLeft: 20, marginRight: 20, borderRadius: 10, backgroundColor: '#e3e4e5', borderColor:'#000000', borderWidth:0.5 }}>
            
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
            data={this.state.list}
            handleResults={this._handleResults}
            showOnLoad
            hideBack= {this.state.hideBack}
            focusOnLayout = {false}
        />  

        <View style={{marginTop: 400, padding:10, flexDirection: 'row', width:360, justifyContent: 'space-between'}}>

                <Button  
                    onPress={() => this._profileBtnPressed()}
                    title="  See your profile  "
                />
                <Button 
                    onPress={() => this._Logud()}
                    title="        Log ud        "
                />           
          </View>

    </View>
        );
      }
    }
    
module.exports = SearchPage; 