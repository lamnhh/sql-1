const router = require("express").Router();
const sql = require("../config/sql-server");

router.get("/", async (_, res) => {
  const staffList = (await sql.query(
    "select MSNV, HT, GT, PB.TENPB as PB from NV join PB on (NV.MSPB = PB.MSPB)"
  )).recordsets[0];
  res.send(staffList);
});

router.post("/", async (req, res) => {
  const { MSNV, HT, GT, MSPB } = req.body;
  const query = `
    insert into NV
    output inserted.MSNV, inserted.HT, inserted.GT, inserted.MSPB
    values ('${MSNV}', N'${HT}', ${GT}, ${MSPB})`;
  const obj = (await sql.query(query)).recordsets[0][0];
  res.send(obj);
});

module.exports = router;
