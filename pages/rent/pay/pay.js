Page({
    data: {
      carInfo:{'carId':'1','carImg':'https://www.youmuzhe.net/image/car1.png','carName':'福特福睿斯','carColor':'白色','carNum':'贵A2WZ72','carDisplacement':'1.5T自动','carSeat':'三厢五座','makeTime':'57','mileage':'21','timeCharge':5.70,'mileageCharge':10.50,'discountInfo':'3张可用'},
      discountList:[
        {'discountId':'1','type':'抵扣券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'2','type':'消费券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false},
        {'discountId':'3','type':'里程券','money':'30','desc':'包含1小时时长和20公里里程，超出部分按时间发生计费，仅可抵扣时长费和里程费','deadline':'2019-07-08','isMake':false}
      ]
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
      this.data.discountList[currentIndx].isMake = true;
      this.data.carInfo.discountInfo = this.data.discountList[currentIndx].type+"："+this.data.discountList[currentIndx].money+"元";
      this.setData({
        discountList:this.data.discountList,
        carInfo:this.data.carInfo
      })
    },
    onShow() {
      console.log(this.data.discountList)
    }
     
  })