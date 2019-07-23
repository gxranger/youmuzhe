const app = getApp();
Page({
  data: {
    petrolPercet:'80%',
    select: false,
    picker: ['完好', '损坏'],
    padNum:[2,1,0],
    keyNum:[1,0],
    currentTag: null,
    internalData:{'carId':'1','carImg':'https://www.youmuzhe.net/image/car1.png','carName':'福特福睿斯','carColor':'白色','carNum':'贵A2WZ72','carPetrolPercent':'80%','carPetrolNum':'60','carKilometerNum':'600','checkList':{'internal':[
      {'internalId':'1','internalName':'内饰','status':0,'imgUrl':[]},
      {'internalId':'2','internalName':'座椅','status':0,'imgUrl':[]},
      {'internalId':'3','internalName':'脚垫','status':0,'imgUrl':[]}
    ],'goods':[
      {'goodsId':'1','goodsName':'车钥匙','status':'0','imgUrl':[]},
      {'goodsId':'2','goodsName':'年检标','status':'0','imgUrl':[]},
      {'goodsId':'3','goodsName':'保险标','status':'0','imgUrl':[]},
      {'goodsId':'4','goodsName':'环保标','status':'0','imgUrl':[]},
      {'goodsId':'5','goodsName':'工具包','status':'0','imgUrl':[]},
      {'goodsId':'6','goodsName':'千斤顶','status':'0','imgUrl':[]},
      {'goodsId':'7','goodsName':'灭火器','status':'0','imgUrl':[]},
      {'goodsId':'8','goodsName':'备胎','status':'0','imgUrl':[]},
      {'goodsId':'9','goodsName':'烟灰缸','status':'0','imgUrl':[]},
      {'goodsId':'10','goodsName':'行驶证','status':'0','imgUrl':[]},
      {'goodsId':'11','goodsName':'手机支架','status':'0','imgUrl':[]},
      {'goodsId':'12','goodsName':'USB转接口','status':'0','imgUrl':[]},
      {'goodsId':'13','goodsName':'故障警示牌','status':'0','imgUrl':[]},
    ]}},
    imgList: [],
  },
  ChooseImage() {
    wx.chooseImage({
      count: 2, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
          console.log(this.data.imgList);
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
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '删除',
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
  PickerChange(e) {
    this.setData({
      currentTag: e.detail.value
    })
    // console.log(e.detail.value);
  },
   // 绑定事件，因为不能用this.setData直接设置每个对象的索引值index。
    // 所以用自定义属性current来标记每个数组对象的下标
    bindChange_select: function(ev) {
     
    // 定义一个变量curindex 储存触发事件的数组对象的下标
        const curindex = ev.target.dataset.current;
        let moduleName = ev.target.dataset.name;
        this.data.internalData.checkList[moduleName][curindex].status = ev.detail.value
    // 把改变某个数组对象index值之后的全新objArray重新 赋值给objArray
        this.setData({
          internalData: this.data.internalData
        })
        
    },
  onLoad() {
    let that = this;
    setTimeout(function() {
        that.setData({
          loading: true
        })
      }, 100)
    
  },
  onShow() {

    
  }
})