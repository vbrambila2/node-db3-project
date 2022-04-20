const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId(req, res, next) {
  const scheme = await db('schemes').where('id', req.params.id).first()

  if(!scheme) {
    res.status(404).json({ message: `scheme with scheme_id ${req.params.id} not found` });
  }

  next();
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name || typeof req.body.scheme_name !== 'string') {
    res.status(400).json({ message: "invalid scheme_name" });
  }
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if(!instructions || instructions === '' || typeof instructions !== 'string') {
    res.status(400).json({ message: "invalid step" })
  } else if(step_number < 1 || typeof step_number !== 'number') {
    res.status(400).json({ message: "invalid step" })
  }

  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
