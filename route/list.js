const express = require('express')
const { ensureAuthenticated } = require('../config/auth')
const {handleusers,handlerooms} = require('../handler/handleList')
const handleListInfo= require('../handler/handleListInfo')

const router = express.Router()

// 員工列表
router.get('/userlist', ensureAuthenticated, async (req, res) => {

    const usersData = await handleusers(req.user)

    res.render('usersList', {
        name: req.user.name,
        title: '員工列表',
        usersData,
    })
})

// 會議室列表
router.get('/roomlist', ensureAuthenticated, async (req, res) => {

    const roomsData = await handlerooms(req.user)

    res.render('roomsList', {
        name: req.user.name,
        title: '會議室列表',
        roomsData,
    })
})

// 會議室會議資訊
router.get('/roomInfo', ensureAuthenticated, async (req, res) => {

    const confsData = await handleListInfo(req.query.id, req.user)

    res.render('roomInfo', {
        name: req.user.name,
        title: '會議室會議資訊',
        confsData,
    })
})

module.exports = router