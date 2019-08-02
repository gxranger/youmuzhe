Page({
    data: {
     messageList:[
       {"id":1,"title":"下单成功","content":"恭喜您成功预订贵阳天怡豪生大酒店。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false},
       {"id":2,"title":"租车成功","content":"亲爱的游牧者会员，您已成功提取汽车祝您用车愉快。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false},
       {"id":3,"title":"注册","content":"恭喜您成功注册成为游牧者会员，您的帐号是：18888640618。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false},
       {"id":4,"title":"注册","content":"恭喜您成功注册成为游牧者会员，您的帐号是：18888640618。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false},
       {"id":5,"title":"注册","content":"恭喜您成功注册成为游牧者会员，您的帐号是：18888640618。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false},
       {"id":6,"title":"注册","content":"恭喜您成功注册成为游牧者会员，您的帐号是：18888640618。下单即享“首日0租金（最高减100元）”优惠，快来体验吧！","date":"07月10日 22:20","status":false}
     ],
     curRead:null,
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
  
 // ListTouch触摸开始
 ListTouchStart(e) {
  this.setData({
    ListTouchStart: e.touches[0].pageX
  })
},

// ListTouch计算方向
ListTouchMove(e) {
  this.setData({
    ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
  })
},

// ListTouch计算滚动
ListTouchEnd(e) {
  if (this.data.ListTouchDirection =='left'){
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  } else {
    this.setData({
      modalName: null
    })
  }
  this.setData({
    ListTouchDirection: null
  })
},
read(e) {
  let id = e.currentTarget.dataset.id;
  this.data.messageList[id].status = true
  this.setData({
    messageList:this.data.messageList
  })
}
    
})