Page({
  options: {
    addGlobalClass: true,
  },
    data: {
      starCount: 0,
      forksCount: 0,
      visitTotal: 0,
    },

    attached() {
      console.log("success")
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      let i = 0;
      numDH();
      function numDH() {
        if (i < 20) {
          setTimeout(function () {
            that.setData({
              starCount: i,
              forksCount: i,
              visitTotal: i
            })
            i++
            numDH();
          }, 20)
        } else {
          that.setData({
            starCount: that.coutNum(3000),
            forksCount: that.coutNum(484),
            visitTotal: that.coutNum(24000)
          })
        }
      }
      wx.hideLoading()
    },

    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
    
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  personInfoInto() {
    wx.navigateTo({
      url: '../personInfo/personInfo'
    })
  },
  messageInto() {
    wx.navigateTo({
      url: '../message/message'
    })
  },
  aboutInto() {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  couponInto() {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  collectionInto() {
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  orderListInto() {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  },
  commentInto() {
    wx.navigateTo({
      url: '../comment/comment'
    })
  },
  travelInto() {
    wx.navigateTo({
      url: '../travel/travel'
    })
  },
  depositInto() {
    wx.navigateTo({
      url: '../deposit/deposit'
    })
  },
  memberAction() {
    wx.showToast({
      image: '../../../images/fail.png',
      title: '敬请期待',
    })
  },
  integralAction() {
    wx.showToast({
      image: '../../../images/fail.png',
      title: '敬请期待',
    })
  }

})