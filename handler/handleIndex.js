const moment = require('moment')
const ConfRoom = require('../models/schema/conferenceRoom')
const Attendee = require('../models/schema/attendee')
const Conf = require('../models/schema/conference')
const ChairSign = require('../models/schema/chairSign')
const SecondRoom = require('../models/schema/secondRoom')
// 處理首頁(參與的會議)
async function handleIndex(user) {
    // 從出席人員檔中取得自己參與的會議
    const attendConfs = await Attendee.find({ staffId: user.staffId, isExist: 1 }).lean()

    const confsData = []
    let userConf

    for (let conf of attendConfs) {

        let confInfo = await Conf.findOne({ _id: conf.confId }).lean() // 從會議主檔中取得會議的詳細資料
        //取得room2
        let room2namedata=await SecondRoom.findOne({ confId: conf.confId }).lean()
        // 轉換時間格式
        confInfo.startTime = moment(confInfo.startTime).format('YYYY-MM-DD HH:mm')
        confInfo.endTime = moment(confInfo.endTime).format('YYYY-MM-DD HH:mm')

        // 取得新空間資訊
        let confRoomData = await ConfRoom.findOne({ _id: confInfo.roomId }).lean()

        // 將出席資料、會議詳細資料與會議室資料放入物件
        userConf = {
            attendData: conf,
            confData: confInfo,
            confRoomData,
            room2namedata
        }

        confsData.push(userConf) // 將物件加到陣列中

    }

    // 回傳出席的會議資料
    return confsData
}

// 處理首頁(主持的會議)
async function handleChairIndex(user) {
    // 從主持人簽核檔中取得自己主持的會議
    const chairConfs = await ChairSign.find({ chairId: user.staffId, isExist: 1 }).lean()

    const confsData = []
    let userConf

    for (let conf of chairConfs) {

        let confInfo = await Conf.findOne({ _id: conf.confId }).lean() // 取得會議的詳細資料
         //取得room2
         let room2namedata=await SecondRoom.findOne({ confId: conf.confId }).lean()
        // 轉換時間格式
        confInfo.startTime = moment(confInfo.startTime).format('YYYY-MM-DD HH:mm')
        confInfo.endTime = moment(confInfo.endTime).format('YYYY-MM-DD HH:mm')

        // 取得新空間資訊
        let confRoomData = await ConfRoom.findOne({ _id: confInfo.roomId }).lean()

        // 將主持資料、會議詳細資料與會議室資料放入物件
        userConf = {
            chairData: conf,
            confData: confInfo,
            confRoomData,
            room2namedata
        }

        confsData.push(userConf) // 將物件加到陣列中
    }

    // 回傳主持的會議資料
    return confsData
}

// 處理首頁(承辦的會議)
async function handleundertakeIndex(user) {
    // 從會議主檔中取得自己承辦的會議
    const undertakeConfs = await Conf.find({ organizerId: user.staffId, isExist: 1 }).lean()

    const confsData = []
    let userConf

    for (let conf of undertakeConfs) {

        let confInfo = await Conf.findOne({ _id: conf._id }).lean() // 取得會議的詳細資料
         //取得room2
        let room2namedata=await SecondRoom.findOne({ confId: conf._id }).lean()
        // 轉換時間格式
        confInfo.startTime = moment(confInfo.startTime).format('YYYY-MM-DD HH:mm')
        confInfo.endTime = moment(confInfo.endTime).format('YYYY-MM-DD HH:mm')

        // 取得新空間資訊
        let confRoomData = await ConfRoom.findOne({ _id: confInfo.roomId }).lean()

       

        // 將主持資料、會議詳細資料與會議室資料放入物件
        userConf = {
            attendData: conf,
            confData: confInfo,
            confRoomData,
            room2namedata
        }

        confsData.push(userConf) // 將物件加到陣列中
    }

    // 回傳承辦的會議資料
    return confsData
}


module.exports = { handleIndex, handleChairIndex, handleundertakeIndex}
