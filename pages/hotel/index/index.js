var Moment = require("../../../utils/moment.js");

//获取应用实例
const app = getApp()

Page({
    data: {
      searchInfo:{keyWord:'租车自驾游',url:'../logs/logs'},
      imgList: [
        {"fileUrl":"https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640","derectUrl":"../logs/logs"},
        {"fileUrl":"https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640","derectUrl":"../logs/logs"},
        {"fileUrl":"https://images.unsplash.com/photo-1551446591-142875a901a1?w=640","derectUrl":"../logs/logs"}
      ],
      currentSwiper : 0 ,
      specialHotelList: [
        {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
        {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
        {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"},
        {"imgUrl":"https://www.youmuzhe.net/image/1.jpg","hotelTitle":"贵阳世纪金源大饭店"}
      ],
      checkInDate:"",
      checkOutDate:"",
      hotelNum:1,
      cardCur:0,
      cardList: [{
        id: 0,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/b1.jpg'
      }, {
        id: 1,
          type: 'image',
          url: 'https://www.youmuzhe.net/image/b2.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/b3.jpg'
      }, ],
      swiperList: [{
        id: 0,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }, {
        id: 1,
          type: 'image',
          url: 'https://www.youmuzhe.net/image/recommendhotel.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }, {
        id: 4,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }, {
        id: 5,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }, {
        id: 6,
        type: 'image',
        url: 'https://www.youmuzhe.net/image/recommendhotel.jpg'
      }],
    },

    // 卡片式幻灯片
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
     // 搜索跳转
    searchInto() {
        wx.navigateTo({
        url: this.data.searchInfo.url
        })
    },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    });
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
    });
    this.num_data(getDate.checkInDate,getDate.checkOutDate)
  },
  // 选择入住和离店时间
  calenderInto(){
    wx.navigateTo({
      url: '../calender/calender'
    })
  },
    // 幻灯片切换当前数监听
    swiperChange:function(event){     
        this.setData({
        currentSwiper: event.detail.current
        });
    },
    // 计算总共入住酒店天数
    num_data: function (strat,end) {
      var start_date = new Date(strat.replace(/-/g, "/"));
      var end_date = new Date(end.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      if (day>0) {
        this.setData({
          hotelNum: day
        })
      } else {
        wx.showToast({
          image: '../../../images/fail.png',
          title: '日期有误',
        })
        this.onShow()
      }
    },
    // 防止幻灯片卡死
    changeGoodsSwip: function (detail) {
        if (detail.detail.source == "touch") {
            //当页面卡死的时候，current的值会变成0 
            if(detail.detail.current == 0){
                //有时候这算是正常情况，所以暂定连续出现3次就是卡了
                let swiperError = this.data.swiperError
                swiperError += 1
                this.setData({swiperError: swiperError })
                if (swiperError >= 3) { //在开关被触发3次以上
                    console.error(this.data.swiperError)
                    this.setData({ goodsIndex: this.data.currentSwiper });//，重置current为正确索引
                    this.setData({swiperError: 0})
                }
            }else {//正常轮播时，记录正确页码索引
                this.setData({ currentSwiper: detail.detail.current });
                //将开关重置为0
                this.setData({swiperError: 0})
            }
        }
    }
})