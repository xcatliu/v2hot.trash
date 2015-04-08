'use strict';

var React = require('react-native');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} = React;

var Topics = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
})

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: Topics,
          title: 'V2HOT'
        }}
      />
    );
  }
});