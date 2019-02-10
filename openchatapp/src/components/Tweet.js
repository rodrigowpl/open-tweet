import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import api from '../services/api'

class Tweet extends Component {
  handleLike = () => {
    const { _id } = this.props

    api.post(`likes/${_id}`)
  }

  render () {
    const { author, content, likes } = this.props

    return (
      <View
        style={styles.container}>
        <Text
          style={styles.author}>
          {author}
        </Text>
        <Text
          style={styles.content}>
          {content}
        </Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={this.handleLike}>
          <Icon
            name='ios-heart-empty'
            size={20}
            color='#999'
          />
          <Text
            style={styles.likeText}>
            {likes}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2022"
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1C2022",
    marginVertical: 10
  },

  likeButton: {
    flexDirection: "row",
    alignItems: "center"
  },

  likeText: {
    color: "#999",
    marginLeft: 5
  }
})

export default Tweet
