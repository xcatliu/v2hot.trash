'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text
} = React;

module.exports = React.createClass({
  getInitialState() {
    return {
      index: -1
    };
  },
  componentDidMount() {
    this.interval = setInterval(() => this.setState({index: (this.state.index + 1) % 3}), 200);
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  render() {
    return (
      <View style={styles.loading}>
        <Text style={styles.dot}>
          <Text style={this.state.index === 0 ? styles.dotHot : {}}>●</Text>
          <Text> </Text>
          <Text style={this.state.index === 1 ? styles.dotHot : {}}>●</Text>
          <Text> </Text>
          <Text style={this.state.index === 2 ? styles.dotHot : {}}>●</Text>
        </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    marginTop: 4
  },
  dot: {
    color: '#ccc',
    fontSize: 12,
    lineHeight: 10
  },
  dotHot: {
    color: 'black'
  }
});
