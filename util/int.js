function Mathround(num){
  var int = Math.round(num/2);
  var res = []
  for(let i = 0; i < 5 ; i++){
     if(i < int){
        res.push(1);
     }else{
       res.push(0)
     }
  }
  return res
}
function http(url, data, method, callback, setName, Type){
  wx.request({
    url: url,
    data:data,
    method: method,
    header: {
      "Content-Type": ""
    },
    success(res) {
      callback(res.data, setName, Type)
      //that.handleData(res.data, setName, Type)
    },
    fail() {
      console.log("error")
    }
  })
}
module.exports = {
  Mathround: Mathround,
  http:http
}