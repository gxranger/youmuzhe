var Moment = require("../../../utils/moment.js");

import { dateStr } from "../../../utils/util";
const app = getApp()
Page({
    data: {
      searchInfo:{keyWord:'租车自驾游',url:'../logs/logs'},
      swiperList: [],
      swiperCurrent : 0 ,
      checkInDate:"",
      checkOutDate:"",
      inDateWeek:"",
      outDateWeek:"",
      hotelNum:1,
      cardCur:0,
      cardList: [],
      recommendList:[],
      startPrice:0,
      endPrice:500,
      activeLeft:null,
      activeRight:[],
      checkbox: [{
        value: 0,
        name: '不限',
        checked: true
      }, {
        value: 1,
        name: '二星级或以下/经济',
        checked: false
      }, {
        value: 2,
        name: '三星级/舒适',
        checked: false
      }, {
        value: 3,
        name: '四星级/高档',
        checked: false
      }, {
        value: 4,
        name: '五星级/豪华',
        checked: false
      }],
      checkedCount: 0,
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
    ChooseCheckbox(e) {
      let items = this.data.checkbox;
      let values = e.currentTarget.dataset.value;
      if (values == 0) {
        for (let i= 1; i < items.length; i++) {
          items[i].checked = false;
        }
        items[0].checked = true;
      } else {
        items[values].checked = !items[values].checked;
        this.data.checkedCount = this.data.checkedCount + (items[values].checked ? 1 : -1);
        items[0].checked = this.data.checkedCount == 0;
      }
      this.setData({
        checkbox: items
      })
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

    // 请求数据
    app.getBanner(this,'hotel_banner_index','swiperList');
    app.getBanner(this,'hotel_bannerCard_index','cardList');
    app.getBanner(this,'hotel_activeLeft_index','activeLeft');
    app.getBanner(this,'hotel_activeRight_index','activeRight');
    app.getBanner(this,'hotel_recommend_index','recommendList');

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
    this.num_data(getDate.checkInDate,getDate.checkOutDate);
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
        swiperCurrent: event.detail.current
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
                    this.setData({ goodsIndex: this.data.swiperCurrent });//，重置current为正确索引
                    this.setData({swiperError: 0})
                }
            }else {//正常轮播时，记录正确页码索引
                this.setData({ swiperCurrent: detail.detail.current });
                //将开关重置为0
                this.setData({swiperError: 0})
            }
        }
    },

    // 起始价格区间input监听
    startNumber(e) {
      if(e.detail.value<0||e.detail.value==""){
        wx.showToast({
          image: '../../../images/fail.png',
          title: '起始价不合法',
        })
      }else{
        this.setData({
          startPrice:e.detail.value
        })
      }
    },
    endNumber(e) {
      if(e.detail.value<=0||e.detail.value==""){
        wx.showToast({
          image: '../../../images/fail.png',
          title: '起始价不合法',
        })
      }else{
        this.setData({
          endPrice:e.detail.value
        })
      }
    },

    // 重置按钮
    restBtn() {
      this.data.checkbox[0].checked=true;
      for(let i=1;i<this.data.checkbox.length;i++){
        this.data.checkbox[i].checked=false;
      }
      this.setData({
        startPrice:0,
        endPrice:500,
        checkbox:this.data.checkbox
      })
    },
    // 提交按钮
    submitBtn() {
      if(this.data.startPrice>this.data.endPrice){
        wx.showToast({
          image: '../../../images/fail.png',
          title: '不能低于起始价',
        })
      }else if(!this.data.checkbox[1].checked){
        
      }
    },
    listInto(){
      wx.navigateTo({
        url: '../list/list'
      })
    }

    
})