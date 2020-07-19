const apiModel = require("../models/api");

exports.approve = async (req, res) => {
    apiName = req.query.api;
    await apiModel.updateOne({ name: apiName }, { status: "approved" });
    req.flash("success", "API Approved");
    res.redirect('/dashboard');
}

exports.delete = async (req, res) => {
    apiName = req.query.api;
    await apiModel.deleteOne({ name: apiName });
    req.flash("success", "API Deleted");
    res.redirect('/dashboard');
}

exports.register = (req, res) => {
    res.render('pages/addapi', {
        pageName: 'MicroAPI | Submit API'
    });
}

exports.submit = (req, res) => {
    const { owner, name, url, img, desc } = req.body;
    let newApi = new apiModel({ owner, name, url, img, desc, status: "pending" });
    newApi.save().then(api => {
        req.flash("success", "API Registered");
        res.redirect('/register-api');
    }).catch(err => {
        console.log(err)
        req.flash("error", "Some error occured, please try again");
        res.redirect('/register-api');
    })
}
