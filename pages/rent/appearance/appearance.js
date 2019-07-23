const app = getApp();
Page({
  data: {
    photoesList:{},
    isPhoto:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    isLength:false,
    from_page_name:''
  },
  showModel(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      isLength:false
    })
  },
  internalInto(){
    wx.navigateTo({
      url: '../internal/internal?from_page_name="returncar"'
      })
  },
  returnMakeCar() {
    if(Object.getOwnPropertyNames(this.data.photoesList).length==15){
      let isCheck = true;
      wx.setStorageSync('isCheck', isCheck);
      wx.navigateBack();
    }else{
      this.setData({
        isLength:true
      })
    }
  },
  photo(e) {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //从相册选择
      success: (res) => {
        let moduleName = e.currentTarget.dataset.name;
        let currentIndex = e.currentTarget.dataset.id;
        this.data.photoesList[moduleName] = res.tempFilePaths[0];
        this.data.isPhoto[currentIndex] = true;
        this.setData({
          isPhoto:this.data.isPhoto
        })
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },

  onLoad: function (options) {
    this.setData({
      from_page_name:options.from_page_name
    })
    console.log(this.data.from_page_name)
  },
})