var postData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  isColl(event) {
    var coll = wx.getStorageSync('collection');
    var _coll = !coll[this.data.id];
    if (coll) {
      coll[this.data.id] = _coll;
    }
    this.showModal(coll, _coll);
  },
  showModal(coll, _coll) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: _coll ? '确认收藏' : '取消收藏',
      showCancel: true,
      cancelText: '取消',
      cancelColor: "#333",
      confirmColor: "#405f80",
      confirmText: "确认",
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('collection', coll)
          that.showToast(coll, _coll)
          that.setData({
            collection: _coll
          })
        }
      }
    })
  },
  showToast(coll, _coll) {
    wx.setStorageSync('collection', coll)
    this.setData({
      collection: _coll
    })
    wx.showToast({
      title: _coll ? "收藏成功" : "取消收藏",
      duration: 1000,
      mask: true
    })
  },
  share() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到微博', '分享到qq', '分享到贴吧'],
      itemColor: "#405f89",
      success(res) {
        console.log(res.tapIndex)
      }
    })
  },
  onMusicTap() {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic:false
      })
    } else {
      this.setData({
        isPlayingMusic: true
      })
      wx.playBackgroundAudio({
        dataUrl: this.data.postList.music.url,
        title: this.data.postList.music.title,
        coverImgUrl: this.data.postList.music.coverImg
      })
    }
  },
  onLoad: function (options) {
    var postId = options.id;
    var postsData = postData.postList[postId];
    this.setData({
      id: postId
    })
    this.setData({
      postList: postsData
    })
    var coll = wx.getStorageSync('collection')
    if (coll) {
      if (coll[postId]) {
        var collections = coll[postId];
      } else {
        coll[postId] = false;
        var collections = coll[postId];
        wx.setStorageSync('collection', coll)
      }
      this.setData({
        collection: collections
      })
    }
    else {
      var collection = {}
      collection[postId] = false;
      wx.setStorageSync('collection', collection)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic: true
      })
    }
    this.onMusic();
  },
  onMusic(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.id;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})