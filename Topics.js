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

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  render: function() {
    return (
      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: V2hot,
          title: 'V2HOT'
        }}
      />
    );
  }
});