import upng from '../../../utils/UPNG';
Page({
    data: {
      coverSrc:"",
      formats: {},
      bottom: 0,
      placeholder: '开始输入...',
      _focus: false,
      title:"",
      editorContent:"",
      date: '请选择日期',
      picker: ['1天', '2天', '3天','4天','5天','6天','7天',],
      withWho:['个人','家庭','朋友','同学','情侣','闺蜜'],
      consumer:['1000元','2000元','3000元','4000元','5000元以上'],
      index: null,
      pnum: null,
      mnum: null,
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

  coverSubmit(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const img = res.tempFilePaths[0];
        // 格式转换Base64
        var base64 = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(img, "base64");
        this.setData({
          coverSrc:base64
        })
      }
      })
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  WithChange(e) {
    this.setData({
      pnum: e.detail.value
    })
  },
  ConsumerChange(e) {
    this.setData({
      mnum: e.detail.value
    })
  },
  readOnlyChange(e) {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
    }).exec()
    
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const img = res.tempFilePaths[0];
        // 格式转换Base64
        var base64 = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(img, "base64");
        that.editorCtx.insertImage({
                src: base64,
                data: {
                  id: 'abcd',
                  role: 'god'
                },
                success: function () {
                  wx.showToast({
                    title: '图片上传成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
      },
    });
    // wx.chooseImage({
    //   count: 1,
    //   success: function (res) {
    //     console.log(res.tempFilePaths);
    //     that.editorCtx.insertImage({
    //       src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
    //       data: {
    //         id: 'abcd',
    //         role: 'god'
    //       },
    //       success: function () {
    //         console.log('insert image success')
    //       }
    //     })
    //   }
    // })
  },
  titleArea(e) {
    this.setData({
      title:e.detail.value
    })
  },
  contentArea(e) {
    // this.editorCtx.getContents({
    //   success(e){
    //     console.log(e)
    //   }
    // });
    this.setData({
      editorContent:e.detail.html
    })
  },
  clearContent() {
    this.editorCtx.clear({
      success(e){
        console.log(e)
      }
    });
    this.setData({
      date: '请选择日期',
      index: null,
      pnum: null,
      mnum: null,
      title:"",
      editorContent:"",
    })
  },
  submitContent() {
    let index = this.data.index;
    let pnum = this.data.pnum;
    let mnum = this.data.mnum;
    let data = {};
    data.img = this.data.coverSrc;
    data.date = this.data.date;
    data.picker = this.data.picker[index];
    data.withWho = this.data.withWho[pnum];
    data.consumer = this.data.consumer[mnum];
    data.title = this.data.title;
    data.editorContent = this.data.editorContent;
    console.log(data);
  }

    
})