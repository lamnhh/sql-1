const router = require("express").Router();
const sql = require("../config/sql-server");

router.get("/", async (req, res) => {
  const staffList = (await sql.query("select * from NV")).recordsets[0];
  res.send(staffList);
});

module.exports = router;
