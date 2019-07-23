Page({
    data: {
      carInfo:{'carId':'1','carImg':'https://www.youmuzhe.net/image/car1.png','carName':'福特福睿斯','carColor':'白色','carNum':'贵A2WZ72','carDisplacement':'1.5T自动','carSeat':'三厢五座'},
    },
    showModel(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null,
      })
    },
    payInto() {
      wx.navigateTo({
      url: '../pay/pay'
      })
  },
    onShow() {
      
    }
     
  })