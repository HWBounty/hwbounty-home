import { Component } from 'react';

import { connect } from 'react-redux';

import { Container, Paper, Tab, Tabs } from '@material-ui/core';

import MusicPlayer from './MusicPlayer';
import Player from './Player';
import QueuePage from './QueuePage';
import SearchMusic from './SearchPage';

import '../MusicModule/musicPlayer.css';

const getHighestThumbnail = (thumbnails) => {
  let best = null;
  thumbnails.forEach((x) => {
    if (!best) best = x;
    if (x.height * x.width > best.height * best.width) best = x;
  });
  return best.url;
};
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
/**
 *
 * @param {Object} info
 * @returns {CleanedVideoData}
 */
const cleanAndParseInfo = (info) => {
  return {
    songName: info.title,
    songAuthor: info.ownerChannelName,
    bestThumbnail: getHighestThumbnail(info.thumbnails),
    url: info.video_url,
  };
};
class MusicModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audionState: {
        startedAt: null,
        loadingProcess: 0,
      },
      volumeLevel: 2000,
      progress: 0,
      playState: 0,
      loading: false,
      socket: null,
      duration: 0,
      currentSong: null,
      tab: 0,
      songInfoMap: new Map(),
      updateMe: false,
    };
  }
  componentDidMount(props) {
    if (!localStorage.getItem('DBIdToken')) return null;
    let player = new Player(this);
    (async () => {
      while (!player?.currentSong?.bestThumbnail) await sleep(1);
      this.setState({});
    })();
  }
  handleTabChange(event, newValue, self) {
    self.setState(Object.assign(self.state, { tab: newValue }));
  }
  render() {
    return null;
    if (!localStorage.getItem('DBIdToken')) return null;
    return (
      <div>
        <Container
          id="musicContainer"
          style={{
            minWidth: 350,
            minHeight: 500,
          }}
        >
          <Paper>
            <Tabs
              value={this.state.tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, newValue) =>
                this.handleTabChange(event, newValue, this)
              }
              variant="scrollable"
            >
              <Tab label="Player" />
              <Tab label="Queue" />
              <Tab label="Search" />
            </Tabs>
            <Container>
              {this.state.tab === 0 && (
                <MusicPlayer
                  player={document.getElementById('streamingVideoForMusic')}
                />
              )}
              {this.state.tab === 1 && (
                <QueuePage
                  player={document.getElementById('streamingVideoForMusic')}
                />
              )}
              {this.state.tab === 2 && (
                <SearchMusic
                  player={document.getElementById('streamingVideoForMusic')}
                />
              )}
            </Container>
          </Paper>
        </Container>
      </div>
    );
  }
}
export default connect()(MusicModule);
/**
 * @typedef {Object} CleanedVideoData
 * @property {String} bestThumbnail
 * @property {String} songName
 * @property {String} songAuthor
 * @property {String} url
 */
