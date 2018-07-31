var strophe =require('./utils/strophe.js')
var WebIM = require('./utils/WebIM.js').default

//app.js   
App({
    //获取直播间page
    getRoomPage: function () {
        return this.getPage("pages/live/detail")
    },
    getPage: function (pageName) {
        var pages = getCurrentPages()
        return pages.find(function (page) {
            return page.__route__ == pageName
        })
    },
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var that = this
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        //集成官方微信小程序sdk
        WebIM.conn.listen({
            onOpened: function (message) {
                WebIM.conn.setPresence()
            },
            onPresence: function (message) {
                switch (message.type) {
                    case "unsubscribe":
                        pages[0].moveFriend(message);
                        break;
                    case "subscribe":
                        if (message.status === '[resp:true]') {
                            return
                        } else {
                            pages[0].handleFriendMsg(message)
                        }
                        break;
                    case "joinChatRoomSuccess":
                        console.log('Message: ', message);
                        break;
                    case "memberJoinChatRoomSuccess":
                        console.log('memberMessage: ', message);
                        break;
                    case "memberLeaveChatRoomSuccess":
                        console.log("LeaveChatRoom");
                        break;
                }
            },
            //接收文字信息
            onTextMessage: function (message) {
                var page = that.getRoomPage()
                if (message) {
                    if (page) {
                        page.receiveMsg(message, 'txt')
                    }
                }
            },
            //接收表情信息
            onEmojiMessage: function (message) {
                var page = that.getRoomPage()
                if (message) {
                    if (page) {
                        page.receiveMsg(message, 'emoji')
                    }
                }
            },
            // 各种异常
            onError: function (error) {
                // 16: server-side close the websocket connection
                if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
                    if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
                        return;
                    }

                    wx.showToast({
                        title: 'server-side close the websocket connection',
                        duration: 1000
                    });
                    // wx.redirectTo({
                    //     url: '../public/login'
                    // });
                    that.onLaunch();
                    return;
                }

                // 8: offline by multi login
                if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
                    wx.showToast({
                        title: 'offline by multi login',
                        duration: 1000
                    })
                    that.onLaunch();
                    return;
                }
            },
        })
      that.testLogin(function(status,info){
         if(status==1){
          //  var WebIMt = WebIM.default;
           var options = {
             apiUrl: WebIM.config.apiURL,
             user: info,
             pwd: '123123',
             grant_type: 'password',
             appKey: WebIM.config.appkey
           }
           wx.setStorage({
             key: "myUsername",
             data: info
           })
           //console.log('open')
           WebIM.conn.open(options,function(gse){
             if (gse==0){
                console.log(gse)
                wx.redirectTo({
                  url: '../public/register_wx?openid='+info,
                })
             }else{
               
               that.getUserInfo(function(ggd){
                 console.log(ggd);
               })
             }
           });
         }else{
           wx.showModal({
             title: info,
             confirmText: 'OK',
             showCancel: false
           })
         }
      })

    },
    testLogin:function(cb){
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://open.zjkytwl.com/hxlive/login',
                data: {
                  code: res.code
                },
                success:function(res){
                    typeof cb == "function" && cb(res.data.status,res.data.info)
                },
                error:function(){
                  typeof cb == "function" && cb(0, '网络错误！')
                }
              })
            } else {
              typeof cb == "function" && cb(0, res.errMsg)
            }
          }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            wx.getUserInfo({
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    }
    ,
    globalData: {
        userInfo: null,
        chatMsg: []
    }
})