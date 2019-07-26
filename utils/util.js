import {  Base64 } from "./base64.min";
import {  hexMD5 } from "./md5";
var networkList = [
  {"districtName":"附近网点","districtId":"1","data":[
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
  ]
  },
  {"districtName":"火车站/机场","districtId":"2","data":[
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
  ]
  },
  {"districtName":"云岩区","districtId":"3","data":[
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
    {"networkName":"中央商务区贵阳阁容酒店","networkDistance":"0.45","networkAddress":"贵阳南明区花果园中央商务区F3栋贵阳格荣酒店地下停车场。","networkCarNumber":"5"},
  ]
  }
  ];

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function sendRequest(url, method, data, success, fail) {
    let body = {
      "client_id":1, //客户端口ID
      "content": data
  };
    let body_base64 = Base64.encode(JSON.stringify(body));
    let signature = hexMD5(body_base64 + '8e7716f72bd177ecc08bbd75c33e130e');
   wx.request({
     url: 'https://youmuzhe.net/api/'+url,
     header: {
       'content-type': 'application/json',
     },
     method: method,
     data: {
      "body": body_base64, //请求客户端ID和用户参数通过加密传输
      "version": 1, //API 版本号，默认为 1
      "signature": signature
     },
     success(res) {
       success(res);
       let sign = hexMD5(res.data.body + '8e7716f72bd177ecc08bbd75c33e130e');
        if(sign != res.data.signature){
            console.log('签名错误！')
        }else{
            console.log(Base64.decode(res.data.body))
        }
     },
     fail(res) {
       fail(res);
     }
  });
 }

 function dateStr(val){
   let date = new Date(val);
   return (date.getMonth() + 1) +"月"+ date.getDate() +"日";
 }

 /**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}


module.exports = {
  formatTime: formatTime,
  sendRequest:sendRequest,
  networkList:networkList,
  wxPromisify: wxPromisify,
  dateStr:dateStr
}
