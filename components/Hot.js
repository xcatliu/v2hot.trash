var React = require('react-native');

var {
  NavigatorIOS,
  StyleSheet
} = React;

var Topics = require('./Topics');
var Topic = require('./Topic');

module.exports = React.createClass({
  handleTopicPress: function(topic: Object) {
    this.props.navigator.push({
      title: '/t/' + topic.id,
      component: Topic,
      passProps: {topic}
    });
  },
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Topics',
          component: Topics,
          passProps: {...this.props}
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});