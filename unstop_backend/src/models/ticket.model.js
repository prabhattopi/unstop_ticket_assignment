const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  seat_no: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required:true,
  },
  row: {
    type: Number,
  },
});

const Ticket= mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
