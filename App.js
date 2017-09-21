import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';

const firebaseConfig = {
  apiKey: "AIzaSyAhMq5JhRJA8mOyKWoLi2qHrZ2RVj6OMo0",
  authDomain: "enjoin-2017.firebaseapp.com",
  databaseURL: "https://enjoin-2017.firebaseio.com",
  projectId: "enjoin-2017",
  storageBucket: "enjoin-2017.appspot.com",
  messagingSenderId: "243125328635"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        //indsæt vores scener/ hvilke scener skal vi have? 
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={SearchPage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='SearchPage'
              title='Search Page'
            />
            <Scene
              component={MenuPage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='MenuPage'
              title='Menu Page'
            />
            <Scene
              component={ProfilePage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='ProfilePage'
              title='Profile Page'
            />
            <Scene
              component={CashRegistrePage}
              hideNavBar={true}
              initial={this.state.hasToken}
              key='CashRegistrePage'
              title='CashRegistre Page'
            />
          </Scene>
        </Router>
      );
    }
  }
}