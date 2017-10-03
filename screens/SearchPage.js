import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
import StatusBar from './XStatusBar';
import ActionButton from './XActionButton';
import ListItem from './ListItem';

// https://github.com/localz/react-native-searchbar/blob/master/example/example.js
const{
    StyleSheet,
    View,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    ListView,
} = ReactNative;
import SearchBar from 'react-native-searchbar';

const items = [
  //hent data i database. 
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];

      export default class SearchContainer extends Component {
        
          constructor(props) {
            super(props);
            this.state = {
              items,
              results: []
            };
            this._handleResults = this._handleResults.bind(this);
          }
        
          _handleResults(results) {
            this.setState({ results });
          }

          /*logud - der skal laves en knap. 
          async userLogout() {
            try {
              await AsyncStorage.removeItem('id_token');
              Alert.alert('Log Out Successfully!');
              Actions.Authentication();
            } catch (error) {
              console.log('AsyncStorage error: ' + error.message);
            }
          }*/
        
          render() {
            return (
              <View>
                <View style={{ marginTop: 110 }}>
                  {
                    this.state.results.map((result, i) => {
                      return (
                        <Text key={i}>
                          {typeof result === 'object' && !(result instanceof Array) ? 'gold object!' : result.toString()}
                        </Text>
                      );
                    })
                  }
                  <TouchableOpacity onPress={() => this.searchBar.show()}>
                    <View style={{ backgroundColor: 'green', height: 100, marginTop: 50 }}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.searchBar.hide()}>
                    <View style={{ backgroundColor: 'red', height: 100 }}/>
                  </TouchableOpacity>
                </View>
                <SearchBar
                  ref={(ref) => this.searchBar = ref}
                  data={items}
                  handleResults={this._handleResults}
                  showOnLoad
                />
              </View>
            );
          }
        }

module.exports = SearchPage;