Page({
  data: {
    TabCur:0,
    scrollLeft:0,
    navContent:['全部','酒店','攻略','游记'],
    hotelList:[
      {"id":1,"imgSrc":"https://www.youmuzhe.net/image/h1.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
      {"id":2,"imgSrc":"https://www.youmuzhe.net/image/h1.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
      {"id":3,"imgSrc":"https://www.youmuzhe.net/image/h2.jpg","name":"贵阳天怡豪生大酒店","score":"4.7","evaluateTag":"服务周到","commentLen":175,"position":{"latitude":"","longitude":"","district":"黔灵山"},"hotelTag":['闪住','商务出行'],"price":"656"},
    ],
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