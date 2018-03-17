var app = getApp();
Page({
  clickhandler(){
    wx.switchTab({
      url: '../post/post',
    })
    console.log(app.globalData.target)
    }
})