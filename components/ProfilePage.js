import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

class ProfilePage extends Component {
    
        constructor(props) {
            super(props);
            this.state = { 
              name: 'Fnat',
              birthday: '01-01-1997' 
            };
        };

            render() {
              return (
                <View>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop:20}}
                        onChangeText={(birthday) => this.setState({birthday})}
                        value={this.state.birthday}
                    />
              </View>
          )
      } 
}

module.exports = ProfilePage;