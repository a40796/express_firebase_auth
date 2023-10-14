const express = require('express');
const router = express.Router();
const fireBase = require('../connetions/firebase_admin_connect');
const firebaseAuth = fireBase.auth();
const firebaseDb = fireBase.database();

router.get('/', (req, res) => {
    res.render('signup', { title: '註冊',error:req.flash('error') });
});

router.post('/', async (req, res) => {
    try {
        const { email, currentPassword, nickname } = req.body;

        const user = await firebaseAuth.createUser({
            email: email,
            password: currentPassword,
            nickname: nickname,
        });

        console.log('Success: User UID -', user.uid);

        const userSave = {
            email,
            password: currentPassword, 
            uid: user.uid,
        };

        await firebaseDb.ref(`/users/${user.uid}`).set(userSave);

        res.redirect('/signup/success');
    } catch (error) {
        const errorMsg = error.message;
        req.flash('error',errorMsg)
        res.redirect('signup')
    }
});

router.get('/success', (req, res) => {
    res.render('success', {
        title: '註冊成功'
    });
});

module.exports = router;
