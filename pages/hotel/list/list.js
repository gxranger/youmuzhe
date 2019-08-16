const app = getApp()
Page({
    data: {
      searchInfo:{keyWord:'搜索酒店',url:'../logs/logs'},
      scrollTop:0,
      hotelList:[],
      total: 0,
      totalPage: 0,
      distanceStatus:0,
      priceStatus:0,
      evaluateStatus:0,
      filter: {
        page: 0,
        page_size: 5,
        sort_type:'1',
        dest_name: '',
        price_id:'0-300',
        keyword:'',
        start_time:'',
        end_time:'',
        rank_id:'',
        geo: {
          lat: 0,
          lng: 0,
          distance: 5000,
        }
      },
    },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   this.onReachBottom();

  },


/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let self = this;
    let filter = this.data.filter;

    // 判断分页是否全部加载完毕，如果加载完毕则不再发起数据请求
    if (filter.page != 0 && filter.page == this.data.totalPage) {
      wx.showToast({
        title: '没有数据啦~',
        image: '../../../images/fail.png',
        duration: 1000
      })
      return ;
    }

    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    filter.page += 1;
    
    app.getPosition(res => {
      // filter.geo.lat = res.latitude;
      // filter.geo.lng = res.longitude;
      app.getApi().post('/standard/hotel/list', filter)
     .then(function(res) {
        self.setData({hotelList:self.data.hotelList.concat(res.data),filter})
        
        if (self.data.total == 0) {
          let total = res.row_count;
          let totalPage = Math.ceil(total / filter.page_size);
          self.setData({total,totalPage})
        }
        // 隐藏加载框
        wx.hideLoading();
     })
     .catch(function(e) {
       //异常处理
     })
    })
    
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  onPageScroll:function(e){
    this.setData({
      scrollTop:e.scrollTop
    })
  },
  sortSwitch(e) {
    let filter = this.data.filter;

    if(e.currentTarget.dataset.name=="distance"){
      let item = this.data.distanceStatus;
      (item==1)||(item==0) ? item = item+1 : item = 0;
      this.setData({
        distanceStatus:item
      })
    }else if(e.currentTarget.dataset.name=="price"){
      let item = this.data.priceStatus;
      if(item==1||item==0){
        item = item+1;
        filter.sort_type =2;
        this.setData({priceStatus:item,filter});
        this.onLoad();
        console.log(this.data.filter)
      }else {
        item = 0;
        filter.sort_type =1;
        this.setData({priceStatus:item,filter});
        this.onLoad();
        console.log(this.data.filter)
      }
    }else if(e.currentTarget.dataset.name=="evaluate"){
      let item = this.data.evaluateStatus;
      (item==1)||(item==0) ? item = item+1 : item = 0;
      this.setData({
        evaluateStatus:item
      })
    }
  },

  detailInto(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },

  positionInto(){
    wx.navigateTo({
      url: '../../position/position'
    })
  }

    
})