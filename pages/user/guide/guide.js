Page({
    data: {
      arrdata: [
        {
        id: 1,
        name: '如何计费?',
        content:
        '采用分时计费规则,从借出充电宝后开始计时,归还充电宝后结束,具体价格以租借时页面展示的计费规则为准,每天封顶20元,计时消费超出20元,按封顶价格计费',
        isTrue:false
        },
        {
        id: 2,
        name:'归还充电宝未结束订单?',
        content:'请进行再次扫码点击租借按钮,此刻会退还上一笔押金余额,如需再借请支付,押金退还时间0-2小时,如两小时后未到账请联系客服',
        isTrue:false
        },
        {
        id: 3,
        name: '为什么充值了,机柜却没有弹出充电宝?',
        content:'充值了没有弹出充电宝,可能充电机柜和充电宝在使用过程中的磨损,导致无法正常弹出充电宝,请放心,没有弹出充电宝是不计算费用的,请重新进行一次租借操作',
        isTrue:false
        },
        {
        id: 4,
        name: '能否请朋友帮忙归还充电宝?',
        content:'当您使用充电宝之后,借给他人使用时,只要您朋友使用完,可以找到附近商店的机柜插入成功即可,系统会结算充电费用,您将会收到退回押金余额的信息',
        isTrue:false
        },
        {
        id: 5,
        name: '能否租借多个充电宝?',
        content:'暂时不支持一人租借多个充电宝,只能租借一个,租借结束后可以再次租借',
        isTrue:false
        },
        {
        id: 6,
        name: '押金规则?',
        content: `押金充值
        在每次使用前需要缴纳押金99元,在每次使用完归还后,会自动结束计费,并在押金中扣除充电费用
         
        押金退还
        在用户归还充电宝到机柜之后,系统会结束订单,并扣除充电费用,剩下的押金余额会原路退回,退款时间为0-2小时之内`,
        isTrue:false
        },]
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

    // 展开折叠选择  
    changeToggle:function(e){
      let index = e.currentTarget.dataset.index;
      this.data.arrdata[index].isTrue = !this.data.arrdata[index].isTrue;
      this.setData({
        arrdata: this.data.arrdata
      })
    },
  

    
})