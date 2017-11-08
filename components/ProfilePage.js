import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import SearchPage from './SearchPage';

class ProfilePage extends Component {
    
        constructor(props) {
            super(props);
            this.state = { 
              name: 'Fnat Fnatter',
              birthday: '01-01-1997' 
            };
        };

      _backBtn(){
        Keyboard.dismiss();
        Actions.SearchPage();
      }

            render() {
              return (
                <View 
                  style={{marginTop: 50, padding: 20}}>

                <Button
                    style={{width: 60}}
                    onPress={() => this._backBtn()}
                    title="   Back   "
                    color="#4dd2ff"
                />
            
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, marginTop:40, textAlign: 'center'}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, marginTop:40, textAlign: 'center'}}
                        onChangeText={(birthday) => this.setState({birthday})}
                        value={this.state.birthday}
                    />
              </View>
          )
      } 
}

module.exports = ProfilePage;