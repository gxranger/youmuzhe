var Moment = require("../../../utils/moment.js");

//获取应用实例
const app = getApp()

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
    
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
    
})