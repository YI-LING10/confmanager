const User = require('../models/schema/user')
const ConfRoom = require('../models/schema/conferenceRoom')

// 處理員工總覽
async function handleusers(user) {

    const usersInfo = await User.find({ isExist: 1 }).lean() // 從員工中取得員工的詳細資料

    const usersData = []
    let userConf

    for (let user of usersInfo) {

        // 將資料放入物件
        userConf = {
            userData: user,
        }

        usersData.push(userConf) // 將物件加到陣列中

    }

    // 回傳員工資料
    return usersData
}

// 處理會議室總覽
async function handlerooms(user) {

    const roomsInfo = await ConfRoom.find({ isExist: 1 }).lean() // 從會議室中取得會議室的詳細資料

    const roomsData = []
    let roomConf

    for (let room of roomsInfo) {

        // 將資料放入物件
        roomConf = {
            roomData: room,
        }

        roomsData.push(roomConf) // 將物件加到陣列中

    }

    // 回傳會議室資料
    return roomsData
}



module.exports = {handleusers,handlerooms}