const router = require('express').Router();

router.get("/auth/login", (req, res) => {
    res.json({email: "lkjsdklfjs", token: "lksdjfldskjf"});
})

router.post("/auth/register", (req, res) => {
    console.log(req.body);

    res.send("It works")
})

module.exports = router;