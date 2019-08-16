const api = require('./utils/api/request');

//app.js
App({
  
  onLaunch: function () {

    this.getMember(1);

  },
  /**
   *  获取广告轮播图
   * self:当前指定的this
   * target:指定的广告标识
   * key：指定的刷新的轮播图数组
   **/
  getBanner(self,target,key) {
    api.post('/standard/system/list_ad', {tag: target})
      .then(function(res) {
        self.setData({ [key]: res })
      })
      .catch(function(e) {
        //异常处理
      })
},

getApi(){
  return api;
},
//登录
login(callback) {
  var self = this;
  wx.login({
    success(res) {
      if (res.code) {
        api.post('/ymz/miniapp/login', {code: res.code})
        .then(res => {
            //成功
            if (res.status) {
              self.globalData.member = res.member;
              callback(res);
            } else if (res.openid) {
              //执行绑定操作
              self.globalData.openid = res.openid;
              //弹出绑定手机号码框
              self.globalData.bindModel = true;
            } else {
              //fail
            }
        })
        .catch( e => {
            //失败
        })

      }
    },
    fail(res) {

    }
  })
},

//用户绑定
bind(obj) {
  if (!this.globalData.openid) {
    //message
    return false;
  }
  let params = {
    mobile: obj.mobile,
    checkcode: obj.smsCode,
    openid: this.globalData.openid,
    secret_code: '',
    fxcode: '',
  }
  api.post('/standard/member/login',params)
    .then(res => {
      self.globalData.member = res.member;
      obj.callback(res);
    })
    .catch(e => {

    })
},

//保存数据
save(params) {
  let member = this.getMember();
  params.id = member.id;
  api.post('/standard/member/save', params)
    .then(res => {
      console.log(res)
      //成功消息
      for(let key in params) {
        member[key] = params[key];
      }
      this.globalData.member = member;
    })
    .catch( e => {
      //错误消息
    });
},

//获取用户信息
getMember(isSync = false) {
  var self = this;
  var member = this.globalData.member;
  console.log(member)
  if (!member) {
    this.login(res=> {});
  } else if (isSync) {
    api.post('/ymz/member/index', {member_id: member.id})
      .then(res => {
        self.globalData.member = res;
      })
      .catch(e => {
        //error
      })
  }
  return member;
},

//获取位置信息
getPosition(callback) {
  var self = this
  var positionData
  wx.getLocation({
    type: 'wgs84',
    success (res) {
      callback(res);
    }
   })

   return positionData ? positionData : self.globalData.positionData
},

globalData: {
  openid: null,
  member: {
    id: 1,
  },
  positionData: null,
}
})