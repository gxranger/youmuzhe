Page({
    data: {
      time: '09:00',
      picker: [1, 2, 3],
      discountList:[
        {'discountId':'1','type':'抵扣券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'2','type':'消费券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'3','type':'里程券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false}
      ],
      discountInfo:'3张可用'
    },

    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },
    TimeChange(e) {
      this.setData({
        time: e.detail.value
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
    makeDiscount(e) {
      let currentIndx = e.currentTarget.dataset.id;
      for(let i =0; i<this.data.discountList.length;i++){
        this.data.discountList[i].isMake = false;
      }
      this.data.discountInfo = this.data.discountList[currentIndx].type+"："+this.data.discountList[currentIndx].money+"元";
      this.data.discountList[currentIndx].isMake = true;
      this.setData({
        discountList:this.data.discountList,
        discountInfo:this.data.discountInfo
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