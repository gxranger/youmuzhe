//index.js
//获取应用实例

const app = getApp()
var topContent = require('../../utils/topContent.js');
Page({
  data: {
    searchInfo:{keyWord:'租车自驾游',url:'../logs/logs'},
    imgList: [
      {"fileUrl":"https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640","derectUrl":"../logs/logs"},
      {"fileUrl":"https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640","derectUrl":"../logs/logs"},
      {"fileUrl":"https://images.unsplash.com/photo-1551446591-142875a901a1?w=640","derectUrl":"../logs/logs"}
    ],
    currentSwiper : 0 ,
    specialHotelList: [
      {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"}
    ],
    hotHotelList: [
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"},
      {"imgUrl":"https://www.youmuzhe.net/image/2.jpg","hotelTitle":"贵阳世纪金源大饭店"}
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // 搜索跳转
  searchInto() {
    wx.navigateTo({
      url: this.data.searchInfo.url
    })
  },

  // 幻灯片切换当前数监听
  swiperChange:function(event){     
    this.setData({
      currentSwiper: event.detail.current
    });
  },

  // 防止幻灯片卡死
  changeGoodsSwip: function (detail) {
    if (detail.detail.source == "touch") {
        //当页面卡死的时候，current的值会变成0 
        if(detail.detail.current == 0){
            //有时候这算是正常情况，所以暂定连续出现3次就是卡了
            let swiperError = this.data.swiperError
            swiperError += 1
            this.setData({swiperError: swiperError })
            if (swiperError >= 3) { //在开关被触发3次以上
                console.error(this.data.swiperError)
                this.setData({ goodsIndex: this.data.currentSwiper });//，重置current为正确索引
                this.setData({swiperError: 0})
            }
        }else {//正常轮播时，记录正确页码索引
            this.setData({ currentSwiper: detail.detail.current });
            //将开关重置为0
            this.setData({swiperError: 0})
        }
    }
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
