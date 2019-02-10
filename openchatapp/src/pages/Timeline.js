import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import socket from 'socket.io-client'

import api from '../services/api'

import Tweet from '../components/Tweet'

class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('New')}>
        <Icon
          name='add-circle-outline'
          size={24}
          color='#4BB0EE'
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    )
  })

  state = {
    tweets: []
  }

  componentDidMount () {
    this.subscribeToEvents()
    this.fetchTweets()
  }

  fetchTweets = async () => {
    const { data } = await api.get('tweets')

    this.setState({ tweets: data })
  }

  subscribeToEvents = () => {
    const io = socket('http://192.168.0.28:3000')

    io.on('tweet', data => {
      this.setState({
        tweets: [data, ...this.state.tweets]
      })
    })

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => (
          tweet._id === data._id ? data : tweet
        ))
      })
    })
  }

  render () {
    const { tweets } = this.state

    return (
      <View
        style={styles.container}>
        <FlatList
          data={tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet {...item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
})

export default Timeline
