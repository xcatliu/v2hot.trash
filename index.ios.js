'use strict';

var React = require('react-native');

var V2hot = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: V2hot,
          title: 'V2HOT'
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('v2hot', () => V2hot);
