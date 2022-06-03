const express = require('express')
const router = express.Router();
const {getTickets,getTicket, createTickets, updateTicket, deleteTickets} = require('./../controllers/tickets')

router.get('/', getTickets);
router.get('/:id', getTicket);
router.post('/', createTickets);
router.put('/:id', updateTicket)
router.delete('/:id', deleteTickets)

module.exports = router;