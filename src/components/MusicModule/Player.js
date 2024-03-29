/**
 * @typedef {Player} Player
 * @property {Player} self
 * @property {SocketIO.Socket} connection
 * @property {Map<String,CleanedVideoData>} songInfoMap
 */

/*
 ██████╗░░█████╗░███╗░░██╗████████╗  ████████╗░█████╗░██╗░░░██╗░█████╗░██╗░░██╗  ████████╗██╗░░██╗██╗░██████╗
 ██╔══██╗██╔══██╗████╗░██║╚══██╔══╝  ╚══██╔══╝██╔══██╗██║░░░██║██╔══██╗██║░░██║  ╚══██╔══╝██║░░██║██║██╔════╝
 ██║░░██║██║░░██║██╔██╗██║░░░██║░░░  ░░░██║░░░██║░░██║██║░░░██║██║░░╚═╝███████║  ░░░██║░░░███████║██║╚█████╗░
 ██║░░██║██║░░██║██║╚████║░░░██║░░░  ░░░██║░░░██║░░██║██║░░░██║██║░░██╗██╔══██║  ░░░██║░░░██╔══██║██║░╚═══██╗
 ██████╔╝╚█████╔╝██║░╚███║░░░██║░░░  ░░░██║░░░╚█████╔╝╚██████╔╝╚█████╔╝██║░░██║  ░░░██║░░░██║░░██║██║██████╔╝
 ╚═════╝░░╚════╝░╚═╝░░╚══╝░░░╚═╝░░░  ░░░╚═╝░░░░╚════╝░░╚═════╝░░╚════╝░╚═╝░░╚═╝  ░░░╚═╝░░░╚═╝░░╚═╝╚═╝╚═════╝░
 
 ░░░░░░████████╗███████╗████████╗
 ░░░░░░╚══██╔══╝██╔════╝╚══██╔══╝
 █████╗░░░██║░░░█████╗░░░░░██║░░░
 ╚════╝░░░██║░░░██╔══╝░░░░░██║░░░
 ░░░░░░░░░██║░░░███████╗░░░██║░░░
 ░░░░░░░░░╚═╝░░░╚══════╝░░░╚═╝░░░
 */
import socketClient, { io } from 'socket.io-client';
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
const cleanAndParseInfoFromYAPI = (info) => {
  return {
    songName: info.items[0].snippet.title,
    songAuthor: info.items[0].snippet.channelTitle,
    bestThumbnail:
      info.items[0].snippet.thumbnails.maxres ||
      info.items[0].snippet.thumbnails.high ||
      info.items[0].snippet.thumbnails.standard ||
      info.items[0].snippet.thumbnails.medium ||
      info.items[0].snippet.thumbnails.default,
    url: `https://youtu.be/${info.items[0].id}`,
  };
};
const checkIfVideoOver = (vidElement) => {
  return (
    Number.isNaN(vidElement.duration) ||
    (Math.abs(vidElement.duration - vidElement.currentTime) < 1 &&
      !Number.isNaN(vidElement.currentTime / vidElement.duration) &&
      vidElement.currentTime / vidElement.duration > 0.995)
  );
};
class Player {
  /**@type {Player} */
  static self;

  constructor(updateMe) {
    this.updateMe = updateMe;
    Player.self = Player.self || this;
    this.songInfoMap = new Map();
    window.URL = window.URL || window.webkitURL;
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    /** @type {SocketIO.Socket} */
    this.socket = socketClient('https://api.hwbounty.help/');
    this.video = document.getElementById('streamingVideoForMusic');
    this.stopPlaying = false;
    this.mediaSource = null;
    /** @type {SourceBuffer} */
    this.sourceBuffer = null;
    this.queue = [];

    this.songQueue = [];
    try {
      /**
       * @type {Array<String>}
       */
      Player.self.songQueue = JSON.parse(localStorage.getItem('queue')) || [];
    } catch (error) {
      Player.self.songQueue = [];
    }
    this.played = [];
    this.songCount = 0;
    this.currentSong = {};
    this.currentSongLink = '';
    this.loop = false;
    this.video.onended = this.processQueue;
    this.socket.on('getTrackInfo', this.handleSongInfo);
    this.socket.on('addSongsToQueue', this.addToQueue);
    this.tryingToPlay = false;
    //change player info "Reactively"
    setInterval(() => {
      this.updateMe.setState(
        Object.assign(this.updateMe.state, {
          updateMe: !this.updateMe.state.updateMe,
        })
      );
      this.processQueue();
    }, 100);
    setInterval(() => {
      localStorage.setItem('queue', JSON.stringify(this.songQueue));
    }, 250);
    this.searchResults = null;
    this.socket.on('querySongs', (data) => {
      this.searchResults = data;
    });
    // this is so that We can reset the data connection and stuff when we need to
  }
  /**
   * @param {String} songURL
   */
  sendTrack(songURL) {
    this.socket.emit('track', songURL);
  }
  /**
   * Plays a song instantly! DO NOT CALL THIS! WILL OVERRIDE WHATS CURRENTLY PLAYING
   * @param {String} songURL
   */
  playSong(songURL) {
    // this.updateMe.setState(Object.assign(this.updateMe.state,{}))
    this.tryingToPlay = true;
    (async () => {
      this.mediaSource = new window.MediaSource();
      this.video.src = window.URL.createObjectURL(this.mediaSource);

      this.video.pause();
      this.socket.emit('track', songURL);
      this.currentSongLink = songURL;
      while (this.mediaSource.readyState !== 'open') await sleep(1);
      this.video.volume = 0.5;
      this.sourceBuffer = this.mediaSource.addSourceBuffer(
        'video/webm; codecs="opus"'
      );
      this.sourceBuffer.mode = 'sequence';
      let end = false;
      let wait = true;
      this.sourceBuffer.onupdateend = () => {
        wait = false;
      };
      let chunkcount = 0;
      let trials = 0;
      setInterval(() => {
        if (trials >= 0) trials -= 2;
      }, 100);
      let inter = setInterval(() => {
        if (this.stopPlaying) clearInterval(inter);
        if (wait) return;
        if (trials > 20) return;
        if (
          this.queue.length &&
          this.mediaSource.readyState === 'open' &&
          this.sourceBuffer
        ) {
          let res = this.queue.shift();
          try {
            this.sourceBuffer.appendBuffer(res);
          } catch (error) {
            trials++;
            this.queue.unshift(res);
          }
        }
      }, 10);

      this.socket.on('video-data-stream', (data) => {
        if (data.link !== songURL) return;
        let uIntArray = new Uint8Array(data.chunk);
        if (chunkcount === 0) {
          this.sourceBuffer.appendBuffer(uIntArray);
          // sourceBuffer.appendBuffer(uIntArray.buffer);
          chunkcount++;
          this.tryingToPlay = false;
          this.video.play();
        } else this.queue.push(uIntArray);
        // if (queue.length === 33) {

        // }
      });
      this.socket.on('video-info', (data) => {
        if (data.link !== songURL) return;
        let cleanedInfo = cleanAndParseInfo(data.data.videoDetails);
        this.currentSong = cleanedInfo;

        // this.songInfoMap.set(songURL, cleanedInfo);
      });
      this.socket.on('video-data-done', () => {});
    })();
  }
  addToQueue(...songLinks) {
    Player.self.songQueue = Player.self.songQueue.concat(songLinks);
  }
  handleSongInfo(link, data) {
    if (data) {
      Player.self.songInfoMap.set(link, cleanAndParseInfoFromYAPI(data));
    } else {
      Player.self.songInfoMap.delete(link);
    }
  }
  processQueue() {
    Player.self.songQueue.forEach((x) => {
      if (!Player.self.songInfoMap.has(x)) {
        Player.self.socket.emit('getTrackInfo', x);
        Player.self.songInfoMap.set(x, 'LoadingInData');
      }
    });
    if (Player.self.tryingToPlay) return;
    if (!checkIfVideoOver(Player.self.video)) return;
    if (Player.self.loop)
      Player.self.songQueue.push(Player.self.currentSongLink);
    if (!Player.self.songQueue.length) {
      // Player.self.currentSong = null;
      return;
    }
    let newSong = Player.self.songQueue.shift();
    if (!newSong) return;
    Player.self.playSong(newSong);
  }
  search(query) {
    Player.self.socket.emit('querySongs', query);
  }
}
export default Player;
