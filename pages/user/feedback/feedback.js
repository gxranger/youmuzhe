Page({
    data: {
      typeValue:0,
      orderCode:"",
      imgList: [],
      isOrderHide:true,
      textareaValue:"",
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
  
  // 单选表单类型监听
  radioChange(e) {
   this.setData({
    isOrderHide:e.detail.value==1 ? false : true,
    typeValue:e.detail.value
   })
  },
  // 订单编号input框监听
  bindKeyInput(e) {
    this.setData({
      orderCode:e.detail.value
     })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '',
      content: '是否删除？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },
  submit() {
    let feedbackData = {};
    if(this.data.textareaValue==""){
      wx.showToast({
        image: '../../../images/fail.png',
        title: '内容不能为空',
      })
    }else{
      feedbackData.type = this.data.typeValue;
      feedbackData.orderCode = this.data.orderCode;
      feedbackData.content = this.data.textareaValue;
      feedbackData.imgList = this.data.imgList;
      console.log(feedbackData);
    }
  }
    
})