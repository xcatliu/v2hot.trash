'use strict';

var React = require('react-native');

var {
  NavigatorIOS,
  StyleSheet
} = React;

var Topics = require('./Topics');

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'V2HOT',
          component: Topics
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
