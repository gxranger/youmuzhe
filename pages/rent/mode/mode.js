// pages/rent/index/mode.js
    
const app = getApp();
Page({
  data: {
    carModeList:[
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"},
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"},
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"},
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"},
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"},
      {"carName":"雪佛兰科沃兹","carNumber":"贵AB3079","capacity":"1.5T自动","seat":"三厢五座","petrolPercet":"80%","mileage":"438KM","carImg":"https://www.youmuzhe.net/image/car1.png"}
    ],
    petrolPercet:'80%',
  },
  onLoad() {
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 100)
  },

  // 车辆预订跳转
  appointInto() {
    wx.navigateTo({
      url: '../appoint/appoint'
    })
  }
})