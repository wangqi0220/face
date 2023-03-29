
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCamera: false,
        src: '',
        userinfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            isCamera: false,
            userinfo: null
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            isCamera: true
        });
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 登录
    login(e) {
        wx.showLoading({
            title: '正在登录',
        })
        this.takePhoto();
        this.getToken()
    },
    //获取Access_token
    getToken(){
      wx.request({
        url: 'https://aip.baidubce.com/oauth/2.0/token',
        method:"GET",
        data:{
          'grant_type':'client_credentials',
          'client_id':'yKAPgRGQKr9pI87oMHXVIf1v',
          'client_secret':"77jcp2sGRPk2wNByihDjlYS4OSvBdUrA",
        },
        success :(res)=>{
          console.log(res.data.access_token,'我看看这是啥')
          if(res.statusCode=='200'){
            wx.setStorageSync('access_token',res.data.access_token);
          }
        }
      })
    },
    //将图片存储到百度云人脸识别库
    uploadPictures(){
      const base=wx.getFileSystemManager().readFileSync(this.data.src, "base64");
      const token=wx.getStorageSync('access_token')
      wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token='+token,
        method:"POST",
        data:{
          image_type:"BASE64",
          image:base,
          group_id:'1',
          user_id:Math.floor(Math.random()*(100-50))+50
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
        },
        success :(res)=>{
          console.log(res,'牛牛牛')
         if(res.statusCode=='200'){
           //这里是新增图片到数据库中成功了，调用查询接口
           console.log('成功了')
           wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                        });
           wx.navigateTo({
            url: "../user/user",
          })
         }
        }
      })
    },
    //调用人脸核实接口
    FaceSearch(){
      const base=wx.getFileSystemManager().readFileSync(this.data.src, "base64");
      const token=wx.getStorageSync('access_token')
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token='+token,
      method:"POST",
        data:{
          image_type:"BASE64",
          image:base,
          group_id_list:"1",
        },
        success:(res)=>{
          console.log(res)
          if(res.statusCode=='200'){
            if(res.data.result.user_list[0].score>=90){
              wx.showToast({
                title: '人脸识别成功',
                icon: 'success',
                duration: 2000
                    });
              wx.navigateTo({
                url: "../user/user",
              })
            } 
          }
        }
    })
    },
    // 请求登录
    requestLogin() {
      // this.uploadPictures()
      this.FaceSearch()
    },
    // 拍照
    takePhoto() {
        let that = this;
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                that.setData({
                    src: res.tempImagePath,
                    isCamera: true
                })
                that.requestLogin();
            },
            fail: function (res) {
                wx.showToast({
                    title: '拍照错误',
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    },
    error(e) {
        wx.showToast({
            title: '请允许小程序使用摄像头',
            icon: 'none',
            duration: 2000
        });
    }
})