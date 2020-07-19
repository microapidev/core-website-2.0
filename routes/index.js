const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../controllers/admin");
const api = require("../controllers/api");
const index = require("../controllers/index");
const contact = require("../controllers/contact");

router.get('/', index.home);
router.get('/about', index.about);
router.get('/login', index.loginForm);

// Admin Routes
router.get('/dashboard', auth, admin.dashboard);
router.get('/logout', admin.logout);

// Api Routes
router.get('/register-api', api.register);
router.post('/register-api', api.submit);
router.get('/approve-api', auth, api.approve);
router.get('/delete-api', auth, api.delete);

//Contact route
router.post('/contact', contact.action);
router.get('/contact', contact.form);

module.exports = router;
