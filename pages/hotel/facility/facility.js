var Moment = require("../../../utils/moment.js");

//获取应用实例
const app = getApp()

Page({
    data: {
      TabCur: 0,
      scrollLeft:0,
      tabTitle:["酒店简介","酒店设施","预定须知"],
      isShow:[true,false,false],
      facilityInfo:{}
    },
    
    tabSelect(e) {
      this.data.isShow = [false,false,false];
      this.data.isShow[e.currentTarget.dataset.id] = true;
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60,
        isShow:this.data.isShow
      })
    },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    console.log(options.id,232323)

    app.getApi().post('/standard/hotel/detail', {
      productid: 2, //从酒店类别获取
    })
    .then(function(res) {
      res.pic_list = res.pic_list.slice(0,5)
      self.setData({facilityInfo: res})
    })
    .catch(function(e) {
      //异常处理
    })
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  positionOpen(e) {
    let lng = e.currentTarget.dataset.lng;
    let lat = e.currentTarget.dataset.lat;
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      scale: 14,
      name: this.data.facilityInfo.title,
      address: this.data.address
    })
  }
    
})