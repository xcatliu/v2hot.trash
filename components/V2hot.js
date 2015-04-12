'use strict';

var React = require('react-native');

var {
  Navigator,
} = React;

var Topics = require('./Topics');
var Topic = require('./Topic');

module.exports = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'Topics'}}
        renderScene={this.renderScene}
      />
    );
  },
  renderScene: function(route, navigator) {
    switch (route.id) {
      case 'Topics': return <Topics navigator={navigator}/>;
      case 'Topic': return <Topic navigator={navigator}/>;
    }
  }
});
