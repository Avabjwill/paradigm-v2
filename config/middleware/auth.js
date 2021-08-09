//Middleware set in place to restrict User from accessing when not logged in or signed up
module.exports = function (req, res) {
    if (req.user) {
        return ("");
    }

    return res.redirect("/");
};