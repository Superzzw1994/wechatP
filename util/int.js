function Mathround(num){
  var int = Math.round(num/2);
  console.log(int)
  var res = []
  for(let i = 0; i < 5 ; i++){
     if(i < int){
        res.push(1);
     }else{
       res.push(0)
     }
  }
  console.log(res)
  return res
}

module.exports = {
  Mathround: Mathround
}