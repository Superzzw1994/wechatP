var app = getApp();
var util = require("../../util/int");
Page({
  data: {
    isEmpty:true,
    currentUrl:"",
    start:0
  },
  showDetail(event) {
    var id = event.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  },
  bindscrolltoupper(event){
     console.log("reflush")
  },
  scrollToLower(event){
    console.log(1)
    var Data = {
      "start": this.data.start,
      "count": 18
    };
    console.log(Data)
    util.http(this.data.currentUrl, Data, 'GET', this.more_handleData);
  },
  onLoad: function (options) {
    var type = options.title;
    var url = "";
    switch (type) {
      case "正在上映":
        url = app.globalData.baseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        url = app.globalData.baseUrl + "/v2/movie/coming_soon";
        break;
      case "Top250":
        url = app.globalData.baseUrl + "/v2/movie/top250";
        break;
      default:
        break;
    }
    var Data = {
      "start": 0,
      "count": 18
    };
    this.setData({
      currentUrl:url
    })
    util.http(url, Data, 'GET', this.more_handleData);
    console.log(this.data)
  },
  more_handleData(res) {
    var result = [];
    var data = res.subjects;
    for (let i = 0; i < data.length; i++) {
      var title = data[i].title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.Mathround(data[i].rating.average),
        title: title,
        imgUrl: data[i].images.large,
        movieId: data[i].id,
        average: data[i].rating.average,
      }
      result.push(temp);
    }
    var totalMovies = [];
    console.log(this.data.isEmpty)
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(result);
      console.log(this.data)
      console.log(totalMovies)
      console.log("zzy")
    }else{
      totalMovies = result;
      console.log("zzw")
      this.setData({
        isEmpty : false
      })
    }
    this.setData({
      movies: totalMovies
    })
    this.data.start += 18;
    console.log(this.data)
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