// 引用百度地图微信小程序JSAPI模块 
let bmap = require('../../../utils/bmap-wx.min.js'); 
let wxMarkerData = []; 
Page({
    data: {
      latitude:'',
      longitude:'',
      scale:18,
      hotelName:'',
      address:''
    },
 
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this; 
      // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'Gf7LYSMUWw6gL2C0ftBXPpFsGFpPoZWy' 
        }); 
        var fail = function(data) { 
            wx.showToast({
                title: '请求位置失败',
                image:'../../images/fail.png',
                duration: 2000
              })
        };
        var success = function(data) { 
            wxMarkerData = data.wxMarkerData; 
            that.setData({
              longitude:wxMarkerData[0].longitude,
              latitude:wxMarkerData[0].latitude,
              address:wxMarkerData[0].address
            })
            console.log(data)
        } 
        // 发起regeocoding检索请求 
        BMap.regeocoding({ 
            fail: fail, 
            success: success
        });  
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  // 打开地图导航
  toMap: function (e) {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: this.data.scale,
      name: '华乾大厦',
      address: this.data.address
    })
  },
  

    
})