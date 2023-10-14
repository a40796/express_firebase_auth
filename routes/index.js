var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    const auth = req.session.uid;
    res.render('index', {
        title: '留言板',
        auth:auth,
        error:req.flash('error')
    });
});

module.exports = router;