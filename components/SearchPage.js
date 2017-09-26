import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
import StatusBar from './XStatusBar';
import ActionButton from './XActionButton';
import ListItem from './ListItem';

const{
    StyleSheet,
    TextInput, 
    View,
    StatusBar,
    KeyboardAvoidingView,
    ListView,
} = ReactNative;

class SearchPage extends Component {

    constructor(){
      //Shop_token er den shop du vælger at gå ind på, derfor token, da den viderføres til næste klasse.   
      this.state = {Shop_Token};
    }

    async userLogout() {
        try {
          await AsyncStorage.removeItem('id_token');
          Alert.alert('Log Out Successfully!');
          Actions.Authentication();
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }

      // her gemmes den valgte shop "text" som token og menu pagen åbnes og token tages med.  
    _searchShop(){
        this.setState{Shop_Token = text};
        Actions.MenuPage();
    }

    render() {
        return (
          //text input, her søges shoppen
          //skal redigeres.. 
          <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
            <StatusBar onPress={this.userLogout.bind(this)} title="Search" />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
            
            <TextInput
              style={{height: 40}}
              placeholder="Type here to search!"
              onChangeText={(text) => this.setState({text})}
            />
            <ActionButton onPress={this._searchShop.bind(this)} title="search" />
    
          </KeyboardAvoidingView>
        )
      }
}

module.exports = SearchPage;