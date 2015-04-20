'use strict';

var React = require('react-native');

var {
  TabBarIOS
} = React;

var Hot = require('./Hot');
var Settings = require('./Settings');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Hot',
      topics: []
    };
  },
  componentWillMount: function() {
    this.topicsMap = {};
  },
  componentDidMount: function() {
    AsyncStorage.getItem('topics')
      .then((topics) => {
        if (topics === null) {
          topics = [];
        } else {
          topics = JSON.parse(topics);
        }
        this.setState({topics: topics}, () => {
          this.createTopicsMap();
          this.fetchTopics();
        });
      })
      .done();
  },
  createTopicsMap: function() {
    this.state.topics.forEach((topic, index) => {
      this.topicsMap[topic.id] = topic;
    });
  },
  fetchTopics: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.mergeTopics(responseData);
      })
      .done();
  },
  updateTopics: function(newTopics: Array) {
    newTopics.reverse().forEach((topic) => {
      if (!this.topicsMap[topic.id]) {
        Object.assign(topic, {
          index: this.state.topics.length,
          viewed: false,
          new_replies: true
        });
        this.state.topics.push(topic);
        this.topicsMap[topic.id] = topic;
        return;
      }
      Object.assign(this.topicsMap[topic.id], {
        new_replies: this.topicsMap[topic.id].replies < topic.replies
      }, ...topic);
    });
    AsyncStorage.setItem('topics', JSON.stringify(this.state.topics))
      .then(() => {
        this.setState({topics: this.state.topics}, () => {
          this.setState({loaded: true});
        });
      })
      .done();
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Hot'
          icon={require('image!hot')}
          selected={this.state.selectedTab === 'Hot'}
          onPress={() => {
            this.setState({selectedTab: 'Hot'});
          }}>
          <Hot/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          icon={require('image!settings')}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => {
            this.setState({selectedTab: 'Settings'});
          }}>
          <Settings/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

