const getDashboard = (req, res) => {
      res.render("dashboard/dashboard", {
            title: "Dashboard page"
      })
}

module.exports = {
  getDashboard,
};