const Tickets = require("../models/Tickets");

const getTickets = async (req, res) => {
  Tickets.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const createTickets = async (req, res) => {
  const ticket = req.body;
  console.log(`ticket received from client side:`, ticket)
  const newticket = new Tickets(ticket);
  console.log(`NEW-ticket created from ticket -> client side:`, newticket)
  
  try{ newticket.save(); } 
  catch(err){console.log(err)}

  await res.json(ticket);
};

const deleteTickets = async (req, res) => {
  const id = req.params.id;
  await Tickets.findByIdAndRemove(id).exec();
  res.send("deleted");
};

module.exports = { getTickets, createTickets, deleteTickets };
