import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './XStatusBar';
import ActionButton from './XActionButton';
import ListItem from './ListItem';
import styles from '../styles';
const {
  AsyncStorage,
  ListView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} = ReactNative;

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
    
  }
  
  getRef() {
    //Her skal hentes items, dvs. varer.
    //hvordan hentes en bestemt database?  
    return firebase.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  render() {
    return (
      //her skal der skabes forbindelse til databasen for hentning af listitems. 
      <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
        <StatusBar title="Menu" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      
        <ActionButton onPress={this._addGood.bind(this)} title="To CashRegistre" />

      </KeyboardAvoidingView>
    )
  }

  
  //add item skal være tilegnet plus item til kassen - 
  //der skal også laves en minus (array hvor goods gemmes)
  _addGood() {
    var goods = [];
    snap.forEach((child) => {
      goods.push({
        title: child.val().title,
        _key: child.key
      });
    });
   // Actions.CashRegistrePage(); 
  }

  //denne alert er til "ordren er bestilt, din erdre er nummer 20". 
  _renderItem(item) {
    const onPress = () => {
      Alert.alert(
        'Lagt i kurv '+item.title,
        null,
        [
          //Se her for remove item i indkøbskurv
          //{text: 'Yes', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'OK', onPress: (text) => this.itemsRef.child(item._key)._addGood}
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        {cancelable: false}
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
module.exports = MenuPage;