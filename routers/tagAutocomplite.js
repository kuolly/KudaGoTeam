
const { Router, query } = require("express");
const router = Router();
const check = require("../middlewares/check");


router.get("/getTags", (req, res) => {
    let tags = ["concert", "event", "exhibision", "show", "live", "any"];
    const text = req.query.text;
    console.log('req QYERY --->>>>', req.query);
    const filteredTags = tags.filter((tag) => tag.indexOf(text) !== -1);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(filteredTags))
});



module.exports = router;