const express = require('express');

// DB access using Knex
const db = require('../data/dbConfig');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/accounts endpoint to Retrieve accounts -

// GET /api/accounts/:id endpoint to Retrieve account by ID -

// POST /api/accounts/ endpoint to Create account -

// PUT /api/accounts/:id endpoint to Update an account -

// DELETE /api/accounts/:id endpoint to Delete an account -

// **********************************************************************

// Custom Middleware

// Validate body on create/update account request - NEEDS TESTING
function updateAccount(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing account data!' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required "name" field!' });
  } else if (!req.body.budget) {
    res.status(400).json({ message: 'Missing required "budget" field!' });
  } else {
    next();
  }
}

// **********************************************************************

module.exports = router;