import { hexMD5 } from '../md5'
import { Base64 } from '../base64.min'

const API_BASE_URL = 'https://www.youmuzhe.net';
const SUB_DOMAIN = '/api';

const API_VERSION = '1.0';
const APP_ID = 1;
const APP_SECRET = '8e7716f72bd177ecc08bbd75c33e130e';


//生成签名
const sign = str => {
    return hexMD5(str + APP_SECRET)
}

//签名验证
const signVerify = (src, dist) => {
    return src == dist
}

const encrypt = (data) => {
    let body = {
        client_id: APP_ID,
        content: data
    }
    
    let bodyStr = Base64.encode(JSON.stringify(body))
    let signStr = sign(bodyStr)

    let params = {
        version: API_VERSION,
        body: bodyStr,
        signature: signStr,
    }

    return params;
}

const decrypt = (bodyStr) => {
    let josnStr = Base64.decode(bodyStr)
    if (josnStr == '') {
        return false;
    }
    let obj = JSON.parse(josnStr)

    return obj;
}

const request = (url, method, data = {}) => {
    console.info(url);
    console.log(data);
    return new Promise((resolve, rejects) => {
        wx.request({
            url: API_BASE_URL + SUB_DOMAIN + url,
            method: method,
            data: encrypt(data),
            header: {
                'Content-Type': 'application/json'
            },
            success(res) {

                let reqData = res.data
                if (signVerify(sign(reqData.body), reqData.signature)) {
                    let bodyObj = decrypt(reqData.body)
                    if (bodyObj.success != true) {
                        let obj = {
                            status: bodyObj.content,
                            message: bodyObj.message
                        }
                        rejects(obj)
                    } else {
                        console.log(bodyObj.content)
                        resolve(bodyObj.content)
                    }
                } else {
                    rejects('签名错误')
                }
            },
            fail(error) {
                console.log(error)
                rejects(error)
            },
            complete(res) {

            }
        })
    })
}

Promise.prototype.finally = function(callback) {
    var Promise = this.constructor;
    return this.then(
        function(value) {
            Promise.resolve(callback()).then(
                function() {
                    return value
                }
            )
        },
        function (reason) {
            Promise.resolve(callback()).then(
                function() {
                    throw reason;
                }
            )
        }
    )
}

const upload = (jsonObject) => {
    file = wx.getFileSystemManager().readFileSync(jsonObject.file, 'base64');
    request('/ymz/upload/image', 'post', {member_id: jsonObject.member_id, file: jsonObject.file, type: jsonObject.type})
      .then(res => {
        jsonObject.callback(res);
      })
      .catch(e => {

      });
}

const login = (jsonObject) => {
    wx.login({
        success: res => {
            if (res.code) {
                request('/ymz/miniapp/login', 'post', {code: res.code})
                    .then(res => {
                        //成功
                        if (res.status) {
                            jsonObject.app.globalData.member = res.member;
                            //jsonObject.success(res);
                        } else {
                            jsonObject.fail(res);
                        }
                    })
                    .catch( e => {
                        //失败
                    })
            }
        }
    })
}

module.exports = {
    request,
    upload,
    login,
    post: (url, data) => request(url, 'post', data),
    get: (url, data) => request(url, 'get', data),
}