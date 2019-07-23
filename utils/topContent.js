// 搜索栏
var searchInfo = {keyWord:'租车自驾游',url:'../logs/logs'};
// 搜索跳转
function searchInto() {
  wx.navigateTo({
    url: searchInfo.url
  })
}

// 幻灯片
var imgList = [
    {"fileUrl":"https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640","derectUrl":"../logs/logs"},
    {"fileUrl":"https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640","derectUrl":"../logs/logs"},
    {"fileUrl":"https://images.unsplash.com/photo-1551446591-142875a901a1?w=640","derectUrl":"../logs/logs"}
  ]

// 幻灯片切换当前数监听
function swiperChange(event){     
    this.setData({
      currentSwiper: event.detail.current
    });
  }

module.exports = {
    searchInfo:searchInfo,
    imgList:imgList,
    swiperChange:swiperChange
}