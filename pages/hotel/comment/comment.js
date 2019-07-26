Page({
    data: {
      TabCur: 0,
      scrollLeft:0,
      commentTab:['全部','晒图','差评']
    },

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
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

    
})