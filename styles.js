const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    height: '100%',
    padding: 50
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  form: {
    backgroundColor: '#f2f2f2',
    paddingTop: 15,
    paddingBottom: -20,
  },
  title: {
    color: '#444',
    fontSize: 26,
    fontWeight: "500",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: '200',
    flex: 1,
    height: 35
  },
  containerStyle: {
    height: 60,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  alignRight: {
    flex: 1
  }
})
module.exports = styles
module.exports.constants = constants;