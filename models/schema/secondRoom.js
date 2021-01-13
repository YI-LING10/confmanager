const mongoose = require('mongoose')
const { Schema } = mongoose

const secondRoomSchema = new Schema({
    confId: { // 會議主檔編號
        type: String,
        require: true
    },
    name: { // 會議室名稱
        type: String,
        require: true
    },
    isExist: { // 是否存在? 1:是 0:被刪除
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('SecondRoom', secondRoomSchema)

