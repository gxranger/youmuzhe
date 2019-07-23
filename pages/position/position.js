// pages/demo/demo.js
let City = require('../../utils/allcity.js');
Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 60, // 搜索条高度
      suctionTop: true// 是否开启标题吸顶
    },
    myCity:{
      status:false,
      latitude:'',
      longitude:'',
      cityName:''
    },
    markers: [], 
    
  },
  onLoad() {

   
    this.setData({
      city: City
    })

  },
  bindtap(e) {
    console.log(e.detail)
  },

})