import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
  AppRegistry,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckboxGroup from 'react-native-checkbox-group';
import ImageSlider from 'react-native-elastic-image-slider';
import ViewMoreText from 'react-native-view-more-text';

import Authentication from './Authentication';
import CartPage from './CartPage';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

const images = [
    {
        width: 40,
        height: 20,
        uri: 'https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/91/918179/14617331-cup-coffee-beans-wooden.jpg'
    },
    {
        width: 40,
        height: 23,
        uri: 'http://beautyblog.dk/wp-content/uploads/2013/03/kaffe.jpg'
    },
    {
        width: 25,
        height: 23,
        uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/16178980_10154077273121861_1262380282828419730_o.jpg?oh=7dc849f61836f170fe6c6a7b64dc125e&oe=5AAEFF08'
    },
    {
        width: 40,
        height: 23,
        uri: 'http://makegoodcoffee.com/coffee-talk/wp-content/uploads/2009/01/espresso.jpg'
    },
  ];

class MenuPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            showMore: false,
        };
        this._handlePosition = this._handlePosition.bind(this);
    };
        
    
  _handlePosition(position){
        this.setState({ position });
        console.log(position + 1); 
  }

  _dropdown_3_adjustFrame(style) {
    style.top -= 15;
    return style;
  }

  onPress(){
    Actions.CartPage();
  }
  renderViewMore(onPress){
    return(
      <Text onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text onPress={onPress}>View less</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <ScrollView ref={el => this._scrollView = el}
                      style={styles.scrollView}
                      contentContainerStyle={styles.contentContainer}
                      showsVerticalScrollIndicator={true}
                      scrollEventThrottle={1}>
                
                <Text style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: 20, paddingTop: 50}}>
                {this.props.title}
                </Text>
            
            <ModalDropdown ref={el => this._dropdown_3 = el}
                           style={styles.dropdown_3}
                           defaultValue = {'choose categori'}
                           //som basis vises de mest populære produkter - eller produkt gruppen fra en ende af. 
                           
                           options={DEMO_OPTIONS_1}
                           adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                           dropdownTextStyle={styles.dropdown_3_dropdownTextStyle}
                           dropdownTextHighlightStyle={styles.dropdown_3_dropdownTextHighlightStyle}
            />

                    <View style={{marginTop: 0, padding: 20, width: 400}}>
                        <ImageSlider
                            images={images}
                            onPositionChanged = {this._handlePosition}
                        />
                    </View>

                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {'Dobbelt espresso toppet med vand \n'}  
                        </Text>
                        
                        <ViewMoreText
                                numberOfLines={2}
                                renderViewMore={this.renderViewMore}
                                renderViewLess={this.renderViewLess}>
                            <Text>
                                Vægt: 270 gram 
                                ingredienser: espresso

                                Næringsværdi pr. kop:
                                Energi kj/Kcal: 0/0 
                                Kulhydrater: 0g 
                                Hvoraf sukkerarter: 0g 
                                Protein: 0g
                                Fedt: 0g
                                Hvoraf mættet fedt: 0g 
                                Salt: 0g
                            </Text>
                        </ViewMoreText>

                    <Text style={{fontWeight: 'bold', paddingTop:20, paddingBottom: 10, textAlign: 'left', width: 315}}>
                        {'Choose extras:'}  
                    </Text>
                        
                        <CheckboxGroup
                            style={styles.doubleContainer}
                            callback={(selected) => { console.log(selected) }}
                            iconColor={"#00a2dd"}
                            iconSize={40}
                            checkedIcon="ios-checkbox-outline"
                            uncheckedIcon="ios-square-outline"
                            checkboxes={[
                                {
                                label: "Bajer", // label for checkbox item 
                                value: 1, // selected value for item, if selected, what value should be sent? 
                                },
                                {
                                label: "Yak",
                                value: 2
                                },
                                {
                                label: "Soya", 
                                value: 3,  
                                },
                            ]}
                            labelStyle={{
                                color: '#333',
                                margin: 10,
                                textAlign: 'center',
                                fontSize: 15,
                            }}
                            rowStyle={{
                                flexDirection: 'row'
                            }}
                            rowDirection={"row"}
                        />
        
            <View style={styles.doubleContainer1}>
                <Button
                    title="  place in cart "
                    color="#4dd2ff"
                    
                />

                <Button
                    onPress={() => this.onPress()}
                    title="   Go to cart   "
                    color="#4dd2ff"
                />
            </View>
        </ScrollView>
    </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
     
  },
  row: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
    
  },
  contentContainer: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown_3: {
    width: 250,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#4dd2ff',
    color: '#fff',
    width: 170,
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
    height: 45,
    width: 270,
  },
  doubleContainer1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: 260,
    paddingTop: 20,
  },
});

module.exports = MenuPage;