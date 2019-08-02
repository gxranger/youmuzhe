Page({
    data: {
      btnValue:'获取验证码',
      btnDisabled:false,
      phone: '',
      code: '',
      snsMsgWait:60
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
  showModel(e) {
    console.log(112)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  verifyTimer () {
    let that = this;
    if(that.data.btnDisabled==false){
      that.setData({
        btnDisabled:true
      })
      let inter = setInterval(function () {
        that.setData({
          btnValue: that.data.snsMsgWait+'s' ,
          snsMsgWait: that.data.snsMsgWait - 1
        });
        if (that.data.snsMsgWait < 0) {
          clearInterval(inter)
          that.setData({
            btnValue: "重新获取",
            snsMsgWait: 60,
            btnDisabled:false
          });
        }
      }.bind(that), 1000);
    }
    
  },
   //获取短信验证码
   getCode() {
    var that = this;
    that.verifyTimer();
  },

  qualifyInto(){
    wx.navigateTo({
      url: '../../rent/qualify/qualify?from_page_name=user',
    })
  }
    
})