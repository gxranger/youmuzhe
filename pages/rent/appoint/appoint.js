// pages/rent/index/mode.js
    
const app = getApp();
Page({
  data: {
    carModeList:[
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"}
    ],
    isAuth:false,
  },
  confirmAppoint(e) {
    if(this.data.isAuth){
      wx.navigateTo({
        url: '../makeCar/makeCar'
      })
    }else {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  qualifyInto() {
    wx.navigateTo({
      url: '../qualify/qualify'
    })
  },
  onLoad() {
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 100)
  }
})