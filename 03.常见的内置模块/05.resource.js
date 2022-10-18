const axios = require('axios')

axios.get('https://api.fjdynamics.com/website/launchManage/getWebsite?language=zh-CN&launchSeat=banners').then(res => {
    console.log(res.data)
})