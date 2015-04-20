'use strict';

var React = require('react-native');

var {
  StyleSheet,
  WebView
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <WebView
        style={styles.webView}
        url={this.props.topic.url}
      />
    );
  },
});

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
