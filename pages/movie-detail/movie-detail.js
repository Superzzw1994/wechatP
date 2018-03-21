var app = getApp();
var util = require("../../util/int");
Page({
  data: {
  
  },

  onLoad: function (options) {
   var movieId = options.id;
   console.log(movieId)
   var url = app.globalData.baseUrl +
      "/v2/movie/subject/" + movieId;
   this.movieDetailHandler(url)
  },
  movieDetailHandler(url){
    util.http(url,{},'GET',this.source)
  },
  source(res){
    var movieDetail = {};
    movieDetail.title = res.original_title;
    movieDetail.location = res.countries;
    movieDetail.year = res.year;
    movieDetail.reviews = res.reviews_count;
    movieDetail.wish = res.wish_count;
    movieDetail.comments = res.comments_count;
    movieDetail.avatar = res.images.large;
    movieDetail.original = res.original_title;
    //处理数组
    res.rating.stars = util.Mathround(res.rating.average);
    console.log(res.rating)
    movieDetail.rating = res.rating;
    movieDetail.dirctor = res.directors;
    for(var i = 0; i < res.casts.length -1;i++){
      res.casts[i].name = res.casts[i].name + " / "
    }
    movieDetail.casts = res.casts;
    for(var i = 0; i < res.genres.length -1;i++){
      res.genres[i] = res.genres[i] + " 、"
    }
    movieDetail.genres = res.genres;
    if (res.summary){
      movieDetail.summary = res.summary;
    }else{
      movieDetail.summary = "暂无简介";
    }
    this.setData({
      detail : movieDetail
    })
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