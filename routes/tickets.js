const express = require('express')
const router = express.Router();
const {getTickets, createTickets, deleteTickets} = require('./../controllers/tickets')

router.get('/', getTickets);
router.post('/', createTickets);
router.delete('/:id', deleteTickets)

module.exports = router;