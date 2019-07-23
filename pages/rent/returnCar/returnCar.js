Page({
    data: {
      carInfo:{'carId':'1','carImg':'https://www.youmuzhe.net/image/car1.png','carName':'福特福睿斯','carColor':'白色','carNum':'贵A2WZ72','carDisplacement':'1.5T自动','carSeat':'三厢五座'},
      isFree:true,
      countDownMinute: '00',
      countDownSecond: '00'
    },
    showModel(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null,
      })
    },
    // 进入外观检查页面
    appearanceInto() {
      wx.navigateTo({
      url: '../appearance/appearance?from_page_name=returncar'
      })
  },
    // 进入故障申报页面
  faultInto() {
    wx.navigateTo({
      url: '../fault/fault'
    })
  },
    onShow() {
    var totalSecond = (Date.parse(new Date())/1000+300) - Date.parse(new Date())/1000;

    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;

       // 天数位
       var day = Math.floor(second / 3600 / 24);
       var dayStr = day.toString();
       if (dayStr.length == 1) dayStr = '0' + dayStr;
  
       // 小时位
       var hr = Math.floor((second - day * 3600 * 24) / 3600);
       var hrStr = hr.toString();
       if (hrStr.length == 1) hrStr = '0' + hrStr;


      // 分钟位
      var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
 
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
 
      this.setData({
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDownMinute: '00',
          countDownSecond: '00',
          isFree:false,
          modalName: null
        });
      }
    }.bind(this), 1000);
    }
     
  })