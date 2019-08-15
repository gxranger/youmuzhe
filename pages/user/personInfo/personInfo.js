Page({
    data: {
      isBindPhone:0
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

  qualifyInto(){
    wx.navigateTo({
      url: '../../rent/qualify/qualify?from_page_name=user',
    })
  }
    
})