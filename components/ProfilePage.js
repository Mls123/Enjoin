import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import SearchPage from './SearchPage';
import styles from '../styles';

class ProfilePage extends Component {
    
        constructor(props) {
            super(props);
            this.state = { 
              Name: '',
              birthday: '',
              loading: false,
              uid: '',
              error: '',
            };
            this.profileRef = firebase.database().ref().child('Profil')
        }

      _backBtn(){
        Keyboard.dismiss();
        Actions.SearchPage();
      }

      componentDidMount() {
        let user = firebase.auth().currentUser; 
        this.ListenForProfiles(this.profileRef.child(user.uid));
        this.setState({email: user.email, uid: user.uid});
        
      }
      ListenForProfiles(profileRef){
        profileRef.on('value', (snap) => {
          this.setState({
            loading: false,
            Name: snap.val().Name,
            birthday: snap.val().birthday,
            uid: snap.key
            //type: snap.val().type,

          })
        })
      }

      updateProfile() {
        this.setState({ loading: true });
        this.profileRef.child(this.state.uid).update({
          Name: this.state.Name,
          birthday: this.state.birthday,
          //type: this.state.type
        })
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ 
            error: 'Update failed. '+err,
            loading: false
          });
        });
      }
      renderButtonOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator size='small' />;    
        }
        return <Button onPress={this.updateProfile.bind(this)} title="Update Profile" />;
      }

            render() {
              return (
                <View 
                  style={{marginTop: 50, padding: 20}}>

                <Button
                    style={{width: 60}}
                    onPress={() => this._backBtn()}
                    title="   Back   "
                    color="#4dd2ff"
                />

                <Text style={{textAlign: 'center', paddingBottom: 20, paddingTop: 20, }}>
                Name and birthday can always be adjusted, simply by changing the text below.  
                </Text>
            
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, marginTop:40, textAlign: 'center'}}
                        onChangeText={(Name) => this.setState({Name})}
                        value={this.state.Name}
                    />
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, marginTop:40, textAlign: 'center'}}
                        onChangeText={(birthday) => this.setState({birthday})}
                        value={this.state.birthday}
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrSpinner()}
              </View>
          )
      } 
}

module.exports = ProfilePage;