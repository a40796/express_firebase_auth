const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = require('../connetions/firebase_auth');

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('login', { title: '登入' });
});

router.post('/', function (req, res) {
    const email = req.body.email;
    const password = req.body.passwd;

    signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(function (userCredential) {
            const user = userCredential.user;
            req.session.uid = user.uid;
            res.redirect('/')
        })
        .catch(function (error) {
            console.error('login failed', error);
            res.redirect('/')
        });
});

module.exports = router;
