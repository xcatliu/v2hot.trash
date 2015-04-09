/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */

var V2hot = React.createClass({
  handleTopicPress: function() {
    console.log(123);
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTopic}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },
  renderTopic: function(topic) {
    return (
      <TouchableHighlight
        activeOpacity={0.9}
        onPress={this.handleTopicPress}
      >
        <View style={styles.container}>
          <Image
            source={{uri: 'https:' + topic.member.avatar_large}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
            <Text style={styles.replies}>{topic.replies}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
});

var App = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'Topics', index: 0}}
        renderScene={(route, navigator) =>
          <NavigatorIOS
            style={styles.wrapper}
            initialRoute={{
              component: V2hot,
              title: 'V2HOT'
            }}
          />
          <MySceneComponent
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 73,
    height: 73,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  replies: {
    textAlign: 'center',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('v2hot', () => App);
