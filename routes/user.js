var express = require('express');
var router = express.Router();
const fireBase = require('../connetions/firebase_admin_connect');
const firebaseDb = fireBase.database();
router.get('/', function (req, res) {
    // req.session.uid
    firebaseDb.ref('users/' + req.session.uid).once('value',function(snapshot){
        res.render('user', { title: '會員專區',nickname:snapshot.val().email});
    })
})
module.exports = router;   