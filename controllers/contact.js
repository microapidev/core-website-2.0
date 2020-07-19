const commentModel = require("../models/contactform");

exports.form = (req, res) => {
    res.render('pages/contact', {
        pageTitle: 'Contact'
    });
}

exports.action = (req, res) => {
    const { name, email, comments } = req.body;
    const newComment = new commentModel({ name, email, comments });

    newComment.save().then( () => {
        req.flash("success", "Thanks for contacting us...");
        res.redirect('/');
    }).catch(err => {
       console.log(err)
       req.flash("error", "comment not saved please try again");
       res.redirect('/contact');
    })
}
