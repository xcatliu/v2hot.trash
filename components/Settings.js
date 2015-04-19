var React = require('react-native');

var {
  View,
  Text,
  NavigatorIOS,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Settings',
          component: Settings
        }}
      />
    );
  }
});

var Settings = React.createClass({
  render: function() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsGroup}>
          <TouchableHighlight>
            <View style={styles.settingsItem}>
              <Text style={styles.settingsItemDangerText}>Clear Topics Data</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text>
          Hello World\n
          Hello World\n
          Hello World\n
          Hello World\n
          Hello World\n
          Hello World\n
        </Text>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f1f0f5', // Pick from WeChat
  },
  settingsGroup: {
    marginTop: 40,
    marginBottom: 40
  },
  settingsItem: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  settingsItemDangerText: {
    fontSize: 16,
    lineHeight: 18,
    color: 'red'
  }
});