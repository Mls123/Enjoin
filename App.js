

import Exponent, {Components} from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
  SharedElementOverlay
} from '@exponent/ex-navigation'

import * as firebase from 'firebase';
import AppRouter from './AppRouter';
import styles from './components/theme'

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
        <View style={[styles.container]}>
        <NavigationProvider router={AppRouter}>
          <SharedElementOverlay>
            <StackNavigation
              id="root"
              initialRoute={AppRouter.getRoute('authentication')}
              initial={!this.state.hasToken}
            />
          </SharedElementOverlay>
        </NavigationProvider>
      </View>
      );
    }
  }
}
      
      /*<Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key='Authentication'
              title='Authentication'
            />
        </Router>
      );
    }
  }
}*/   

Exponent.registerRootComponent(App);
