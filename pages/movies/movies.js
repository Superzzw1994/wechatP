var app = getApp();
var util = require("../../util/int");
Page({
  data: {
    
  },
  handleData(res, setName,Type){
    var result = [];
    var data = res.subjects;
    for(let i =0; i < data.length; i++){
      var title = data[i].title;
      if(title.length >= 6){
        title = title.substring(0,6)+"..."
      }
      var temp = {
        stars: util.Mathround(data[i].rating.average),
        title: title,
        imgUrl: data[i].images.large,
        movieId : data[i].id,
        average: data[i].rating.average,
      }
      result.push(temp);
    }
    var readyData = {};
    readyData[setName] = {
      Type:Type,
      movies:result
    }
    this.setData(readyData)
   
  },
  getMovies(url,setName,Type){
    var that = this;
    wx.request({
      url: url,
      data: {
        "start": 0,
        "count": 3
      },
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success(res) {
        that.handleData(res.data, setName,Type)
      },
      fail() {
        console.log("error")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Top250Movies = app.globalData.baseUrl +"/v2/movie/top250";
    var comingSoonUrl = app.globalData.baseUrl +"/v2/movie/coming_soon";
    var inThreaterUrl = app.globalData.baseUrl +"/v2/movie/in_theaters";
    this.getMovies(inThreaterUrl,"inThreater","正在上映");
    this.getMovies(comingSoonUrl,"comingSoon","即将上映");
    this.getMovies(Top250Movies,"Top250Movies","Top250");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})