Page({
    data: {
      basics: 0,
      numList: [{
        name: '上传证件'
      }, {
        name: '驾驶证认证'
      }],
      stepDisplay:[true,false],
      select: false,
      tihuoWay: '身份证',
      subSting: '身份证',
      authTypeList:[
        {"id":"1","name":"身份证","subSting":"身份证"},
        {"id":"2","name":"军人身份证","subSting":"身份证"},
        {"id":"3","name":"港澳居民来往内地通行证","subSting":"内地通行证"},
        {"id":"4","name":"台湾居民来往大陆通行证","subSting":"大陆通行证"},
        {"id":"5","name":"外籍护照","subSting":"护照"}
      ],
      selectId:1,
      num: 0,
      scroll: 0,
      from_page_name:null,
      isUser:false,
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
    },

    numSteps(e) {
      this.data.stepDisplay[0] = false;
      this.data.stepDisplay[1] = true;
      this.setData({
        num: this.data.num + 1,
        stepDisplay:this.data.stepDisplay
      });
    },
    bindShowMsg() {
        this.setData({
         select:!this.data.select
        })
      },
    mySelect(e) {
        var name = e.currentTarget.dataset.name;
        var id = e.currentTarget.dataset.id;
        var sname = e.currentTarget.dataset.sub;
        console.log(e.target);
        this.setData({
        tihuoWay: name,
        select: false,
        selectId:id,
        subSting:sname
        })
    },

    completeBtn() {
      wx.navigateTo({
        url: '../makeCar/makeCar'
      })
      console.log(1212121)
    }
     
  })