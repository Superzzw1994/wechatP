var app = getApp();
var util = require("../../util/int");
Page({
  data: {
    movies:{}
  },
  moreHandler(event) {
    var type = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../more/more?title='+type
    })
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
  onLoad: function (options) {
    var that = this;
    var Top250Movies = app.globalData.baseUrl +"/v2/movie/top250";
    var comingSoonUrl = app.globalData.baseUrl +"/v2/movie/coming_soon";
    var inThreaterUrl = app.globalData.baseUrl +"/v2/movie/in_theaters";
    var Data = {
      "start": 0,
      "count": 3
    };
    util.http(inThreaterUrl, Data , 'GET', this.handleData, "inThreater", "正在上映");
    util.http(comingSoonUrl, Data , 'GET', this.handleData, "comingSoon", "即将上映")
    util.http(Top250Movies, Data , 'GET', this.handleData, "Top250Movies", "Top250")
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