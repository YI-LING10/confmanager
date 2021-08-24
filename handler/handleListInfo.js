const moment = require('moment')
const Conf = require('../models/schema/conference')

// 處理會議資訊頁
module.exports = async (roomId, user) => {

    // 從會議主檔中取得會議的資料
    const confInfo = await Conf.find({ roomId: roomId, isExist: 1 }).lean().sort({ 'name': 1 })

    //console.log(confInfo)

    const confsData = []
    let userConf

    for (let conf of confInfo) {

        // 轉換時間格式
        conf.startTime = moment(conf.startTime).format('YYYY-MM-DD HH:mm')
        conf.endTime = moment(conf.endTime).format('YYYY-MM-DD HH:mm')

        // 將資料放入物件
        userConf = {
            confData: conf,
        }

        confsData.push(userConf) // 將物件加到陣列中

    }

    return confsData 

}