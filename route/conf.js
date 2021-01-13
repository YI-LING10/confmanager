const express = require('express')
const { ensureAuthenticated } = require('../config/auth')
const { getUnCheckNoti, getUsersRooms } = require('../handler/getUsual')
const handleCreate = require('../handler/handleCreate')
const { handleIndex, handleChairIndex,handleundertakeIndex } = require('../handler/handleIndex')
const handleInfo = require('../handler/handleInfo')
const handleUpdate = require('../handler/handleUpdate')
const handleDelete = require('../handler/handleDelete')
const handleRoomUpdate = require('../handler/handleRoomUpdate')
const { noticeList, enterNoticeConf } = require('../handler/handleNotice')

const router = express.Router()

// 會議列表
router.get('/', ensureAuthenticated, async (req, res) => {

    console.log(req.session)
    console.log('User', req.user)

    const noticeNum = await getUnCheckNoti(req.user.staffId)
    const { users, confRooms } = await getUsersRooms()
    const confsData = await handleIndex(req.user)

    res.render('index', {
        name: req.user.name,
        title: '會議列表',
        users,
        noticeNum,
        confRooms,
        confsData,
    })
})

// 主持會議列表
router.get('/chair', ensureAuthenticated, async (req, res) => {

    const noticeNum = await getUnCheckNoti(req.user.staffId)
    const { users, confRooms } = await getUsersRooms()
    const confsData = await handleChairIndex(req.user)
    
    res.render('chairIndex', {
        name: req.user.name,
        title: '會議列表',
        confsData,
        users,
        noticeNum,
        confRooms
    })
})

// 承辦會議列表
router.get('/undertake', ensureAuthenticated, async (req, res) => {

    const noticeNum = await getUnCheckNoti(req.user.staffId)
    const { users, confRooms } = await getUsersRooms()
    const confsData = await handleundertakeIndex(req.user)
    
    res.render('undertakeIndex', {
        name: req.user.name,
        title: '會議列表',
        confsData,
        users,
        noticeNum,
        confRooms
    })
})

// 新增會議
router.post('/create', ensureAuthenticated, (req, res) => {
    handleCreate(req.body, req.user).then((data) => {
        if (data) {
            req.flash('success', '您已成功舉辦一個會議')
        } else {
            req.flash('warning', '舉辦會議失敗，請再試一次')
        }
        res.redirect('/')
    })
})

// 會議資訊
router.get('/confInfo', ensureAuthenticated, async (req, res) => {

    const noticeNum = await getUnCheckNoti(req.user.staffId)
    const { users, confRooms } = await getUsersRooms()
    const { confInfo, roomInfo, attendeeList, minutes, organizer, chairSign, roomSign, identity } = await handleInfo(req.query.id, req.user, users, confRooms)

    res.render('info', {
        name: req.user.name,
        title: '會議資訊',
        confInfo,
        roomInfo,
        attendeeList,
        minutes,
        organizer: organizer.name,
        chairSign,
        roomSign,
        identity,
        users,
        confRooms,
        noticeNum
    })
})

// 編輯會議
router.post('/confInfo', ensureAuthenticated, (req, res) => {
    // console.log(req.body)

    if (Object.keys(req.body).length === 1) { // 表單只有傳回一個元素(只有roomId) -> 會議處於只能編輯地點的狀態(場地被駁回)
        handleRoomUpdate(req.query.id, req.body).then((data) => {
            if (data) {
                req.flash('success', '您已成功修改使用空間')
            } else {
                req.flash('warning', '修改失敗，請再試一次')
            }
            res.redirect(`/confInfo?id=${req.query.id}`)
        })
    } else {
        handleUpdate(req.query.id, req.body).then((data) => {
            if (data) {
                req.flash('success', '您已成功修改會議資料')
            } else {
                req.flash('warning', '修改失敗，請再試一次')
            }
            res.redirect(`/confInfo?id=${req.query.id}`)
        })
    }

})

// 刪除會議
router.get('/delete', ensureAuthenticated, (req, res) => {
    handleDelete(req.query.id).then((data) => {
        if (data) {
            req.flash('success', '您已刪除一個會議')
        } else {
            req.flash('warning', '刪除失敗，請再試一次')
        }
        res.redirect('/')
    })
})

// 通知中心
router.get('/notice', ensureAuthenticated, async (req, res) => {

    const noticeNum = await getUnCheckNoti(req.user.staffId)
    const notifications = await noticeList(req.user.staffId)

    res.render('notification', {
        name: req.user.name,
        title: '通知中心',
        notice: notifications,
        noticeNum
    })

})

// 點擊通知中心的會議
router.get('/notice/:noticeId', ensureAuthenticated, (req, res) => {

    enterNoticeConf(req.params.noticeId).then((result) => {
        return res.redirect(`/confInfo?id=${req.query.confId}`)
    }).catch((error => {
        return console.log(error)
    }))
})


module.exports = router