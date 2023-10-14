const express = require('express');
const router = express.Router();
const fireBase = require('../connetions/firebase_admin_connect');
const firebaseDb = fireBase.database();
const { body, validationResult } = require('express-validator');
router.post('/',[
    body('content').notEmpty().withMessage('內容不能為空值')
], function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('error',errors.errors[0].msg);
        res.redirect('/')
    }else{
        firebaseDb.ref('users/' + req.session.uid).once('value',function(snapshot){
            const email = snapshot.val().email;
            const ref = firebaseDb.ref('lists').push();
            const listContent = {
                email:email,
                content:req.body.content
            } 
            ref.set(listContent)
            .then(function(){
                res.redirect('/')
            })
        })
    }
})
module.exports = router;