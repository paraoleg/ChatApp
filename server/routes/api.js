const express = require('express');
const router = express.Router();
const Users = require('../models/users');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/users', (req, res) =>{
  res.status(200).json(Users);
})

router.get('/users/:id', (req, res) => {
  id = req.params.id;
  console.log(id);
  heroes.find(hero => {
    if (hero.id === id) {
      return res.status(200).json(hero);
    }
  });
  
});

module.exports = router;