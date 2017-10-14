import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { Button, StyleSheet, Text, View} = ReactNative;

class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
          <Button style={styles.alignRight} onPress={this.props.onPress} title="Log out" />
        </View>
      </View>
    );
  }
}

module.exports = StatusBar;