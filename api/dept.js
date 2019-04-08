const router = require("express").Router();
const sql = require("../config/sql-server");

router.get("/", async (req, res) => {
  const deptList = (await sql.query("select * from PB")).recordsets[0];
  res.send(deptList);
});

module.exports = router;
