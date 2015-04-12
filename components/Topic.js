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

var Topic = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    );
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: Topic,
          title: 'Hello World'
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
