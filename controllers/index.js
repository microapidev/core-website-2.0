const apiModel = require("../models/api");

exports.home = async (req, res) => {
    const approvedApis = await apiModel.find({ status: "approved" });
    res.render('pages/index', {
        pageTitle: 'Open Source APIs for individuals and Enterprises.',
        apis: approvedApis
    })
}

exports.loginForm = (req, res) => {
    if(req.session.auth) {
        res.redirect('/dashboard');
    }
    else
    {
        res.render('pages/login', {
            pageTitle: 'Admin Login'
        });
    }
}

exports.about = (req, res) => {
    res.render('pages/about', {
        pageTitle: 'About'
    });
}

exports.blog = (req, res) => {
    res.render('pages/blog', {
        pageTitle: 'blog'
    });
}