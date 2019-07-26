Page({
    data: {
      searchInfo:{keyWord:'租车自驾游',url:'../logs/logs'},
      scrollTop:0,
      hotelList:[
        {"id":1,"imgSrc":"https://www.youmuzhe.net/image/h1.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
        {"id":2,"imgSrc":"https://www.youmuzhe.net/image/h1.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
        {"id":3,"imgSrc":"https://www.youmuzhe.net/image/h2.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
        {"id":4,"imgSrc":"https://www.youmuzhe.net/image/h2.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
        {"id":5,"imgSrc":"https://www.youmuzhe.net/image/h3.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
        {"id":6,"imgSrc":"https://www.youmuzhe.net/image/h3.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"}
      ],
      distanceStatus:0,
      priceStatus:0,
      evaluateStatus:0
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
  onPageScroll:function(e){
    this.setData({
      scrollTop:e.scrollTop
    })
  },
  distanceSwitch(e) {
    if(e.currentTarget.dataset.name=="distance"){
      let item = this.data.distanceStatus;
      (item==1)||(item==0) ? item = item+1 : item = 0;
      this.setData({
        distanceStatus:item
      })
    }else if(e.currentTarget.dataset.name=="price"){
      let item = this.data.priceStatus;
      (item==1)||(item==0) ? item = item+1 : item = 0;
      this.setData({
        priceStatus:item
      })
    }else if(e.currentTarget.dataset.name=="evaluate"){
      let item = this.data.evaluateStatus;
      (item==1)||(item==0) ? item = item+1 : item = 0;
      this.setData({
        evaluateStatus:item
      })
    }
  },

  detailInto() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  positionInto(){
    wx.navigateTo({
      url: '../../position/position'
    })
  }

    
})