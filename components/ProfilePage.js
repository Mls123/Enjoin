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
import Authentication from './Authentication';

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
      _Logud(){
        try {
          AsyncStorage.removeItem('id_token');
          Alert.alert('Log Out Successfully!');
          Actions.Authentication();
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
    
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

          })
        })
      }

      updateProfile() {
        this.setState({ loading: true });
        this.profileRef.child(this.state.uid).update({
          Name: this.state.Name,
          birthday: this.state.birthday,
  
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
                  style={{marginTop: 40}}>
                      
                  <View style={{padding:10, flexDirection: 'row', width:360, justifyContent: 'space-between'}}>

                      <Button
                          title="    back    "
                          onPress={() => this._backBtn()}
                      />
                      <Button 
                        onPress={() => this._Logud()}
                        title="    Log ud    "
                      /> 
                      </View>

                <Text style={{textAlign: 'center', paddingBottom: 20, paddingTop: 20, }}>
                Name and birthday can always be adjusted, simply by changing the text below and click update.  
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