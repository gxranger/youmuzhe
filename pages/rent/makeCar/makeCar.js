const app = getApp();
Page({
  data: {
    isContract:true,
    isTimeShow:false,
    isCheckShow:false,
    carInfo:{'carId':'1','carImg':'https://www.youmuzhe.net/image/car1.png','carName':'福特福睿斯','carColor':'白色','carNum':'贵A2WZ72','carDisplacement':'1.5T自动','carSeat':'三厢五座'}
  },

  // 租车合同确认判断
  confirmContract() {
    this.setData({
      isContract:!this.data.isContract
    })
  },
  showModel(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      isTimeShow:false
    })
  },
  checkOutCar() {
    wx.navigateTo({
      url: '../appearance/appearance?from_page_name=makecar'
      })
  },
  internalInto() {
    wx.navigateTo({
      url: '../internal/internal'
      })
  },

  onLoad() {
    // 人脸识别弹窗初始化
    wx.clearStorageSync()
    
  },
  onShow() {
    wx.showShareMenu({
      withShareTicket: true
    })
    // 人脸识别弹窗状态监测，如本地存储参数为真则隐藏
    if(wx.getStorageSync('isCheck')){
      this.setData({
        isCheckShow:true
      })
    }else{
      this.setData({
        isCheckShow:false
      })
    }
  }
})