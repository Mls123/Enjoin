import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Authentication from './Authentication';
import * as firebase from 'firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-checkbox';
import CheckboxGroup from 'react-native-checkbox-group'

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

class MenuPage extends Component {

    constructor(props) {
        super(props);
        
        };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <ScrollView ref={el => this._scrollView = el}
                      style={styles.scrollView}
                      contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={true}
                      scrollEventThrottle={1}>
            <Text style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: 30, paddingTop: 30}}>
              {'Shop navn!'}
            </Text>
            <ModalDropdown ref={el => this._dropdown_3 = el}
                           style={styles.dropdown_3}
                           defaultValue = {'Vælg kategori'}
                           options={DEMO_OPTIONS_1}
                           adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                           dropdownTextStyle={styles.dropdown_3_dropdownTextStyle}
                           dropdownTextHighlightStyle={styles.dropdown_3_dropdownTextHighlightStyle}
            />
          
            <Image >
               source={{uri: 'https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/91/918179/14617331-cup-coffee-beans-wooden.jpg'}}
               style={{Height: 100, width: 200, paddingTop: 100, paddingBottom: 10}}
            </Image>

          <Text style={{textAlign: 'center', paddingTop:100}}>
          
            {'information omkring kaff '}  
            </Text>

            <Text style={{fontWeight: 'bold',textAlign: 'center', paddingTop:20, paddingBottom: 10}}>
          
            {'Tilføj tilbehør!:'}  
            </Text>
          
          <CheckboxGroup
          callback={(selected) => { console.log(selected) }}
          iconColor={"#00a2dd"}
          iconSize={50}
          checkedIcon="ios-checkbox-outline"
          uncheckedIcon="ios-square-outline"
          checkboxes={[
            {
              label: "Bajer", // label for checkbox item 
              value: 1, // selected value for item, if selected, what value should be sent? 
            },
            {
              label: "Ad",
              value: 2
            },
          ]}
          labelStyle={{
            color: '#333',
            padding:20,
          }}
          rowStyle={{
            flexDirection: 'row'
          }}
          rowDirection={"row"}
        />
          
        <CheckboxGroup
          callback={(selected) => { console.log(selected) }}
          iconColor={"#00a2dd"}
          iconSize={50}
          checkedIcon="ios-checkbox-outline"
          uncheckedIcon="ios-square-outline"
          checkboxes={[
            {
              label: "Tofu", // label for checkbox item 
              value: 1, // selected value for item, if selected, what value should be sent? 
               
            },
            {
              label: "Soya",
              value: 2
            },
          ]}
          labelStyle={{
            color: '#333',
            padding:20,
          }}
          rowStyle={{
            flexDirection: 'row'
          }}
          rowDirection={"row"}
        />

       <View style={styles.doubleContainer}>
        <Button
            //onPress={Actions.cartView}
            title="Læg i kurven"
            color="#841584"
            />

            <Button
            title="Gå til kurven!!"
            color="#841584"
            />
    </View>
          </ScrollView>
        </View>
      </View>
    );
  }


  _dropdown_3_adjustFrame(style) {
    style.top -= 15;
    return style;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    
  },
  
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown_3: {
    width: 300,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#000',
    color: '#fff',
    width: 100,
    textAlign: 'center',
  },
  dropdown_3_dropdownTextHighlightStyle: {
    backgroundColor: '#fff',
    color: '#000'
  },
  doubleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor:'black',
  }
 
});

module.exports = MenuPage;