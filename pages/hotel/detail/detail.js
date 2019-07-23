var Moment = require("../../../utils/moment.js");

Page({
    data: {
      TabCur: 0,
      scrollLeft:0,
      hotelInfo:[
        {"name":"酒店简介","renovation":"2019","open":"2017","scale":"200间","content":"锦江之星（贵阳喷水池商业中心地铁站店）地处贵阳市中心喷水池核心商圈，紧领地铁1号线、2号线，人民大道、中华中路、延安东路、瑞金中路几条商业主干道近在咫尺，酒店步行约3分钟直达贵州各地特色小吃汇聚的陕西路美食一条街，南国花锦、清真街、智诚名店、国贸广场、龙港百盛等购物休闲中心遍布周围。从酒店到大十字、小十字、大南门商圈也很方便。酒店周边办公写字楼林立，国税大厦、省市国税局、省政府省人大、省国土局、林业厅、人社厅、供电局等单位举步之遥；振华科技大厦、邮政大厦、鸿祥大厦、兴中元大厦等商务写字楼遍布其间。酒店大堂、餐厅为欧洲地中海式风格，尽显典雅精致；另配备有免费停车场、电信高速光纤WiFi全覆盖，无论您到贵阳出差、旅游，酒店全体员工都期待为您的旅途增加便利和精彩。","call":"0851-85911666","address":{ "name":"贵阳护国路68号","latitude":"","longitude":""}},
        {"name":"酒店设施","wifi":true,"tingche":true,"xiyu":true,"shangwang":true,"dianchuifeng":true,"xishu":true,"jiaoxing":true,"xiyi":true,"zaocan":true},
        {"name":"预定须知","content":"入店时间14：00以后，离店时间12：00以前，不允许携带宠物。"}
      ],
      isShow:[true,false,false],
      checkInDate:"",
      checkOutDate:"",
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
    },

    tabSelect(e) {
      this.data.isShow = [false,false,false];
      this.data.isShow[e.currentTarget.dataset.id] = true;
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60,
        isShow:this.data.isShow
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