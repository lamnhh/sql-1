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
  try {
    if (!MSNV.match(/[0-9]{6}/)) {
      throw Error("Invalid ID");
    }
    if ((await sql.query(`select * from NV where MSNV='${MSNV}'`)).recordsets[0].length !== 0) {
      throw Error("Staff ID already exists");
    }
    if ((await sql.query(`select * from PB where MSPB=${MSPB}`)).recordsets[0].length === 0) {
      throw Error("Invalid department");
    }
    const query = `
      insert into NV
      output inserted.MSNV, inserted.HT, inserted.GT, inserted.MSPB
      values ('${MSNV}', N'${HT}', ${GT}, ${MSPB})`;
    const obj = (await sql.query(query)).recordsets[0][0];
    res.send(obj);
  } catch (err) {
    res.status(400).send({
      error: err.message
    });
  }
});

module.exports = router;
