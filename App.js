import Authentication from './components/Authentication';
import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';

import SearchPage from './components/SearchPage';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import OrderVIew from './componentsShop/OrderView';

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
              component={OrderVIew}
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