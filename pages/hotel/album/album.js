var Moment = require("../../../utils/moment.js");

//获取应用实例
const app = getApp()

Page({
    data: {
      TabCur: 0,
      scrollLeft:0,
      albumImgList:[
        {"name":"外观","src":[
          "https://www.youmuzhe.net/image/hotelCase3.jpg",
          "https://www.youmuzhe.net/image/hotelCase4.jpg",
          "https://www.youmuzhe.net/image/hotelCase5.jpg",
          "https://www.youmuzhe.net/image/hotelCase5.jpg"
        ]},
        {"name":"内景","src":[
          "https://www.youmuzhe.net/image/hotelCase1.jpg",
          "https://www.youmuzhe.net/image/hotelCase1.jpg",
          "https://www.youmuzhe.net/image/hotelCase1.jpg",
          "https://www.youmuzhe.net/image/hotelCase1.jpg"
        ]},
        {"name":"房间","src":[
          "https://www.youmuzhe.net/image/hotelCase7.jpg",
          "https://www.youmuzhe.net/image/hotelCase7.jpg",
          "https://www.youmuzhe.net/image/hotelCase7.jpg",
          "https://www.youmuzhe.net/image/hotelCase7.jpg"
        ]},
        {"name":"浴室","src":[
          "https://www.youmuzhe.net/image/hotelCase8.jpg",
          "https://www.youmuzhe.net/image/hotelCase8.jpg",
          "https://www.youmuzhe.net/image/hotelCase8.jpg",
          "https://www.youmuzhe.net/image/hotelCase8.jpg"
        ]},
        {"name":"餐厅","src":[
          "https://www.youmuzhe.net/image/hotelCase6.jpg",
          "https://www.youmuzhe.net/image/hotelCase6.jpg",
          "https://www.youmuzhe.net/image/hotelCase6.jpg",
          "https://www.youmuzhe.net/image/hotelCase6.jpg",
        ]},
        {"name":"环境","src":[
          "https://www.youmuzhe.net/image/hotelCase2.jpg",
          "https://www.youmuzhe.net/image/hotelCase2.jpg",
          "https://www.youmuzhe.net/image/hotelCase2.jpg",
          "https://www.youmuzhe.net/image/hotelCase2.jpg",
        ]},
      ],
      curList:null
    },

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60,
        curList:this.data.albumImgList[e.currentTarget.dataset.id].src
      })
    },
    previewImg(e) {
      wx.previewImage({
        current: e.currentTarget.dataset.curImg, // 当前显示图片的http链接
        urls: this.data.albumImgList[this.data.TabCur].src // 需要预览的图片http链接列表
      })
    },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当前相册照片初始化
    this.setData({
      curList:this.data.albumImgList[0].src
    })
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})