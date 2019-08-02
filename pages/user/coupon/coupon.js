Page({
    data: {
      TabCur: 0,
      scrollLeft:0,
      navContent:['全部','租车','酒店'],
      discountList:[
        {'discountId':'1','type':'抵扣券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'2','type':'消费券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'3','type':'里程券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false}
      ]
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  }

    
})