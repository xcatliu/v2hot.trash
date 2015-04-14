'use strict';

var React = require('react-native');

var {
  StyleSheet,
  WebView
} = React;

module.exports = React.createClass({
  getUrl: function() {
    var url = this.props.topic.url;
    if (url.indexOf('https') === 0) {
      return url;
    }
    return url.replace('http', 'https');
  },
  render: function() {
    return (
      <WebView
        style={styles.webView}
        url={this.getUrl()}
      />
    );
  },
});

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
