const app = getApp();
var utils=require('../../../utils/util.js');
Page({
  data: {
     networkList:utils.networkList,
     TabCur: 0,
     MainCur: 0,
     VerticalNavTop: 0,
     list: [],
     load: true
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < this.data.networkList.length; i++) {
      list[i] = this.data.networkList[i];
      list[i].name = this.data.networkList[i].districtName;
      list[i].id = i;
    }
    console.log(list[0].name);
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading();
    
  },
  positionInto() {
    wx.navigateTo({
      url: '../../position/position'
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
    
    
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        console.log(this.data.VerticalNavTop);
        
        return false
      }
    }
  }

})