const Admins = require('../models/admins');
const apiModel = require("../models/api");

const { isEmpty, isEmail } = require('validator');
const bcrypt = require('bcryptjs');

// Admin Dashboard
exports.dashboard = async (req, res) => {
    var allApis = await apiModel.find({});
    var approvedApis = await apiModel.find({ status: "approved" });
    var pendingApis = await apiModel.find({ status: "pending" });

    res.render('pages/dashboard', {
        pageName: 'Admin Dashboard',
        allApisCount: allApis.length,
        pendingApisCount: pendingApis.length,
        approvedApisCount: approvedApis.length,
        allApis: allApis,
        pendingApis: pendingApis,
        approvedApis: approvedApis
    });
}

// Admin Login
exports.login = (req, res) => {

    const { email, password } = req.body;
    if(isEmpty(email) || isEmpty(password)) {
        req.flash('error', 'All fields are required');
        res.redirect('/login');
    }
    if(!isEmail(email)) {
        req.flash('error', 'Please enter a valid email');
        res.redirect('/login');
    }

    Admins.findOne({ email }).then(admin => {
        if(!admin) {
            req.flash('error', 'Email does not exist in our record');
            res.redirect('/login');
        }else{
            bcrypt.compare(password, admin.password, (err, result) => {
                if(result) {
                    req.session.auth = true;
                    req.session.email = admin.email;
                    req.flash('success', 'Welcome back, You\'re logged in');
                    res.redirect('/dashboard');
                }else {
                    req.flash('error', 'Invalid Password');
                    res.redirect('/login');
                }
            })
        }
    }).catch(err => {
        req.flash('error', 'Sorry, an error occured during login');
        res.redirect('/login');
    })
}

exports.logout = (req, res) => {
    req.session.auth = false;
    req.session.email = null;
    res.redirect('/');
}
