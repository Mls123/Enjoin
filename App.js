
import Authentication from './components/Authentication';
import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import searchPage from './components/searchPage';
import MenuPage from './components/MenuPage';

const firebaseConfig = {
  apiKey: "AIzaSyAhMq5JhRJA8mOyKWoLi2qHrZ2RVj6OMo0",
  authDomain: "enjoin-2017.firebaseapp.com",
  databaseURL: "https://enjoin-2017.firebaseio.com",
  projectId: "enjoin-2017",
  storageBucket: "enjoin-2017.appspot.com",
  messagingSenderId: "243125328635"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [];

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({ hasToken: user !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              initial={!this.state.hasToken}
              hideNavBar={true}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={searchPage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='searchPage'
              title='searchPage'
            />
            <Scene
              component={MenuPage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='MenuPage'
              title='MenuPage'
            />
            </Scene>
          </Router>
      );
    }
  }
}