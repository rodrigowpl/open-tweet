import React, { Component } from 'react'

import api from '../services/api'

import twitterLogo from '../twitter.svg'
import './Timeline.css'
import Tweet from '../components/Tweet'

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  }

  componentDidMount () {
    this.fetchTweets()
  }

  fetchTweets = async () => {
    const { data } = await api.get('tweets')

    this.setState({ tweets: data })
  }

  handleNewTweet = async e => {
    const ENTER = 13
    if (e.keyCode !== ENTER) return

    const content = this.state.newTweet
    const author = localStorage.getItem('@OpenChat:username')

    await api.post('tweets', { content, author })

    this.setState({ newTweet: '' })
  }

  handleInputChange = e => {
    const { target: { value } } = e

    this.setState({
      newTweet: value
    })
  }

  render () {
    const { tweets, newTweet } = this.state

    return (
      <div
        className='timeline-wrapper'>
        <img
          src={twitterLogo}
          alt='twitter'
        />
        <form>
          <textarea
            value={newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder='O que está acontecendo?'
          />
        </form>
        <ul class='tweet-list'>
          {tweets.map(tweet => (
            <Tweet
              key={tweet._id}
              {...tweet}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Timeline
