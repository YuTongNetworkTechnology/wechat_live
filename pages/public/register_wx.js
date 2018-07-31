var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
var app = getApp();
Page({
    data: {
        username: '',
        password: '',
        openid:''
  }, 
    onLoad: function (option) {
      var that=this;
      if (WebIM.conn.isOpening() || WebIM.conn.isOpened()) {
        wx.switchTab({
          url: '../live/index'
        })
      }
      that.setData({
        openid:option.openid,
      })
    },
    register: function () {
        var that = this
        wx.getUserInfo({success:function(res){
          app.globalData.userInfo = res.userInfo;
          var options = {
                apiUrl: WebIM.config.apiURL,
                username: that.data.openid,
                password: '123123',
                nickname: res.userInfo.nickname,
                appKey: WebIM.config.appkey,
                success: function (res) {
                    if (res.statusCode == '200') {
                        wx.showToast({
                            title: '注册成功,正在登录',
                            icon: 'success',
                            duration: 1500,
                            success: function () {
                                var data = {
                                    apiUrl: WebIM.config.apiURL,
                                    user: that.data.openid,
                                    pwd: '123123',
                                    grant_type: 'password',
                                    appKey: WebIM.config.appkey
                                }
                                //console.log('data',data)
                                wx.setStorage({
                                    key: "myUsername",
                                    data: that.data.openid
                                })
                                setTimeout(function () {
                                    WebIM.conn.open(data,function(resd){
                                        if(resd==1){
                                          wx.switchTab({
                                            url: '../live/index'
                                          })
                                        }
                                    })
                                }, 1000)

                            }
                        });
                    }
                },
                error: function (res) {
                    if (res.statusCode !== '200') {
                        wx.showModal({
                            title: '用户名已被占用',
                            showCancel: false,
                            confirmText: 'OK'
                        })
                    }
                }
            }
            WebIM.utils.registerUser(options)
        }})
        // if (that.data.username == '') {
        //     wx.showModal({
        //         title: '请输入用户名！',
        //         confirmText: 'OK',
        //         showCancel: false
        //     })
        // } else if (that.data.password == '') {
        //     wx.showModal({
        //         title: '请输入密码！',
        //         confirmText: 'OK',
        //         showCancel: false
        //     })
        // } else {
        //     var options = {
        //         apiUrl: WebIM.config.apiURL,
        //         username: that.data.username,
        //         password: that.data.password,
        //         nickname: '',
        //         appKey: WebIM.config.appkey,
        //         success: function (res) {
        //             if (res.statusCode == '200') {
        //                 wx.showToast({
        //                     title: '注册成功,正在登录',
        //                     icon: 'success',
        //                     duration: 1500,
        //                     success: function () {
        //                         var data = {
        //                             apiUrl: WebIM.config.apiURL,
        //                             user: that.data.username,
        //                             pwd: that.data.password,
        //                             grant_type: 'password',
        //                             appKey: WebIM.config.appkey
        //                         }
        //                         //console.log('data',data)
        //                         wx.setStorage({
        //                             key: "myUsername",
        //                             data: that.data.username
        //                         })
        //                         setTimeout(function () {
        //                             WebIM.conn.open(data)
        //                         }, 1000)

        //                     }
        //                 });
        //             }
        //         },
        //         error: function (res) {
        //             if (res.statusCode !== '200') {
        //                 wx.showModal({
        //                     title: '用户名已被占用',
        //                     showCancel: false,
        //                     confirmText: 'OK'
        //                 })
        //             }
        //         }
        //     }
            // WebIM.utils.registerUser(options)
        }
})