let express = require('express');
let router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello from the router!');
});


module.exports = router;