const express = require('express');
const router = express.Router();
const port = 3001


router.post('/authorization', function (req, res) {
    res.send('authorization');
});

router.post('/registration', function (req, res) {
    res.send('registration');
})

module.exports = router;
