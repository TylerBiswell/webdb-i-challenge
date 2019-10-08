const express = require('express');

// DB access using Knex
const db = require('../data/dbConfig');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/accounts endpoint to Retrieve accounts - FUNCTIONAL
router.get('/', (req, res) => {
  const sortby =
    req.query.sortby === 'name'
      ? 'name'
      : req.query.sortby === 'budget'
      ? 'budget'
      : 'id';
  const sortdir = req.query.sortdir === 'desc' ? 'desc' : 'asc';

  // console.log('sortby:', sortby);

  db('accounts')
    .limit(req.query.limit)
    .orderBy(sortby, sortdir)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the accounts' });
    });
});

// GET /api/accounts/:id endpoint to Retrieve account by ID - FUNCTIONAL
router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Invalid account ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the account' });
    });
});

// POST /api/accounts/ endpoint to Create account - FUNCTIONAL
router.post('/', validateAccount, (req, res) => {
  db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
      console.log(ids);
      res.status(201).json({ newAccount: ids[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error creating the account' });
    });
});

// PUT /api/accounts/:id endpoint to Update an account - FUNCTIONAL
router.put('/:id', validateAccount, (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The account has been updated' });
      } else {
        res.status(404).json({ message: 'Invalid account ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error updating the account' });
    });
});

// DELETE /api/accounts/:id endpoint to Delete an account - FUNCTIONAL
router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The account has been deleted' });
      } else {
        res.status(404).json({ message: 'Invalid account ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the account' });
    });
});

// **********************************************************************

// Custom Middleware

// Validate body on create/update account request - FUNCTIONAL
function validateAccount(req, res, next) {
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