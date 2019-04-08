const router = require("express").Router();
const sql = require("../config/sql-server");

router.get("/", async (_, res) => {
  const deptList = (await sql.query("select * from PB")).recordsets[0];
  res.send(deptList);
});

router.post("/", async (req, res) => {
  const { MSPB, TENPB } = req.body;
  const query = `
    insert into PB
    output inserted.MSPB, inserted.TENPB
    values (${MSPB}, N'${TENPB}')`;
  const obj = (await sql.query(query)).recordsets[0][0];
  res.send(obj);
});

module.exports = router;
