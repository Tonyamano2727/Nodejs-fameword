const router = require('express').Router()
const ctrls = require('../Controllers/User')
const {verifyToken , isAdmin} = require('../Middleware/verifiToken')

router.post('/register', ctrls.register)
router.delete('/:uid', ctrls.deleteUser)
router.get('/',ctrls.getUsers)
router.put('/update/:uid',ctrls.updateUser)

module.exports = router