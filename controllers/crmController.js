const db = require("../lib/db");

module.exports.addNewContact = addNewContact;
module.exports.getAll = getAll;
module.exports.getOneContact = getOneContact;
module.exports.updateContact = updateContact;
module.exports.removeContact = removeContact;

function addNewContact(req, res, next) {
  if (!req.body) {
    res.status(401).json({ error: "Veuillez remplir tout le champs" });
  } else {
    const { firstName, lastName, email, company, phone } = req.body;
    const sql = `INSERT INTO contact (firstname, lastname, email, company,phone)
     VALUES(?, ?, ?, ?,? ) ;
    `;
    db.query(sql, [firstName, lastName, email, company, phone])
      .then(() => {
        let count = 1;
        res.status(201).json({ message: "success!" + count++ });
      })
      .catch(next);
  }
}

function getAll(req, res, next) {
  const sql = `SELECT * FROM contact;`;
  db.query(sql)
    .then((rows) => {
      res.status(201).json({ data: rows });
    })
    .catch(next);
}
function getOneContact(req, res, next) {
  const params = req.params.id;
  const sql = `SELECT * FROM contact WHERE id=?;`;
  db.query(sql, [params])
    .then((contact) => {
      res.status(201).json({ data: contact });
    })
    .catch(next);
}
function updateContact(req, res, next) {
  const { id: _id } = req.params;
  const contact = { ...req.body };
  const sql = `UPDATE contact SET ? WHERE (id=?);`;
  db.query(sql, [contact, _id])
    .then(() => {
      res.status(201).json({ message: "update succes!" });
    })
    .catch(next);
}

function removeContact(req, res, next) {
  const { id: _id } = req.params;
  const sql = `DELETE FROM contact WHERE id=?;`;
  db.query(sql, [_id])
    .then(() => {
      res.status(201).json({ message: "delete with succes!" });
    })
    .catch(next);
}
