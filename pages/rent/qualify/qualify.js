Page({
    data: {
      basics: 0,
      numList: [{
        name: '上传证件'
      }, {
        name: '面部识别'
      }, {
        name: '驾驶证认证'
      }, {
        name: '缴纳保证金'
      }, ],
      stepDisplay:[true],
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
    onLoad: function (options) {
      this.setData({
        from_page_name:options.from_page_name
      })
      if(this.data.from_page_name=="user"){
        this.data.numList.pop();
        this.setData({
          numList:this.data.numList
        })
      }
    },

    numSteps(e) {
      let stepArr = [false];
      this.data.stepDisplay[0] = false;
      for(let i = 0; i< this.data.numList.length; i++){
        stepArr.push(i == this.data.num);
      };
      this.setData({
        num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1,
        stepDisplay:stepArr
      });
      console.log(stepArr)
    },
    bindShowMsg() {
        this.setData({
         select:!this.data.select
        })
      },
    makeCarInto() {
      wx.navigateTo({
        url: '../makeCar/makeCar'
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
      console.log(1212121)
    }
     
  })