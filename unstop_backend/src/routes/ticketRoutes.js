const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');

router.post('/', TicketController.createTicket);
router.get('/', TicketController.getAllTickets);
router.get('/:id', TicketController.getSingleTicket);
router.put('/:id', TicketController.updateTicket);
router.post('/reset', TicketController.deleteTicket);

module.exports = router;
