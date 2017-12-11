import Authentication from './components/Authentication';
import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';

import SearchPage from './components/SearchPage';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import OrderView from './components/OrderView';

const firebaseConfig = {
  apiKey: "AIzaSyDiJkAGmoG-zplJQOf78HRfqajREF0bDqg",
  authDomain: "enjoindb.firebaseapp.com",
  databaseURL: "https://enjoindb.firebaseio.com",
  projectId: "enjoindb",
  storageBucket: "enjoindb.appspot.com",
  messagingSenderId: "253129759594"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
//console.ignoredYellowBox = [];

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
              component={SearchPage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='SearchPage'
              title='SearchPage'
            />
            <Scene
              component={MenuPage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='MenuPage'
              title='MenuPage'
            />
            <Scene
              component={CartPage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='CartPage'
              title='CartPage'
            />
            <Scene
              component={ProfilePage}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='ProfilePage'
              title='ProfilePage'
            />
            <Scene
              component={OrderView}
              initial={this.state.hasToken}
              hideNavBar={true}
              key='OrderView'
              title='OrderView'
            />
            </Scene>
          </Router>
      );
    }
  }
}