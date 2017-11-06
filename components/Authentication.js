import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

import styles from '../styles';
import searchPage from './searchPage';

const {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView
} = ReactNative;

class Authentication extends Component {
  constructor() {
    super();
    this.state = { 
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  }

  userAuth() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ error: '', loading: false });
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        AsyncStorage.setItem('id_token', idToken);
        console.log(idToken);
        //Alert.alert( 'Sign In Successfully!', 'Click the button to go to Home Page!');
        Actions.searchPage();
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => { 
          this.setState({ error: '', loading: false });
          firebase.auth().currentUser.getIdToken().then(function(idToken) {
            AsyncStorage.setItem('id_token', idToken);
            console.log(idToken);
            //Alert.alert( 'Sign Up Successfully!', 'Click the button to go to Home Page!');
            Actions.searchPage();
          })
          .catch(() => {
            this.setState({ error: 'Failed to obtain user ID token.', loading: false });
          });
        })
        .catch((err) => {
            this.setState({ error: 'Authentication failed. '+err, loading: false });
        });
    });
  }
  
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='medium' />;    
    }
    return <Button onPress={this.userAuth.bind(this)} title="Log in" />;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Welcome</Text>

        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(email) => this.setState({email})}
            placeholder='Username'
            value={this.state.email}
          />

          <TitledInput
            label='Password'
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            secureTextEntry
            value={this.state.password}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    
const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
          
          <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            //style={inputStyle}
            editable={true}
            returnKeyType='next'
          />

        </View>
    );
};

module.exports = Authentication;