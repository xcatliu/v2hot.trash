'use strict';

var React = require('react-native');

module.exports = React.createClass({
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