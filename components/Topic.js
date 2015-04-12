'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
