const express = require('express');
const upload = require('express-fileupload');
var router = express.Router();
var path = require('path');

//getting image
router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "../images/" + req.params.id));

});
module.exports = router;