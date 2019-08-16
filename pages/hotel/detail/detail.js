var Moment = require("../../../utils/moment.js");
import { dateStr } from "../../../utils/util";
const app = getApp()
Page({
    data: {
      checkInDate:"",
      checkOutDate:"",
      inDateWeek:"",
      outDateWeek:"",
      hotelNum:1,
      swiperList: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      }, {
        id: 4,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
      }, {
        id: 5,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
      }, {
        id: 6,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }],
      hotelInfo:{}
    },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let self = this;
    console.log(options.id,232323)

    app.getApi().post('/standard/hotel/detail', {
      productid: 2, //从酒店类别获取
    })
    .then(function(res) {
      res.pic_list = res.pic_list.slice(0,5)
      self.setData({hotelInfo: res})
    })
    .catch(function(e) {
      //异常处理
    })
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
        inDateWeek:Moment(new Date()).format('EE'),
        outDateWeek:Moment(new Date()).add(1, 'day').format('EE')
      }
    });
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    
    this.setData({
      checkInDate: dateStr(getDate.checkInDate),
      checkOutDate: dateStr(getDate.checkOutDate),
      inDateWeek:getDate.inDateWeek,
      outDateWeek:getDate.outDateWeek
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
    orderInto() {
      wx.navigateTo({
        url: '../order/order'
      })
    },
    albumInto(){
      wx.navigateTo({
        url: '../album/album'
      })
    },
    calenderInto(){
      wx.navigateTo({
        url: '../calender/calender'
      })
    },
    facilityInto(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../facility/facility?id='+id
      })
    },
    commentInto(){
      wx.navigateTo({
        url: '../comment/comment'
      })
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