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
const getTicket = async (req, res) => {
  Tickets.findById({_id:req.params.id}, (err, result) => {
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

const updateTicket = async(req,res) => {
  const progress = req.body.progress;
  const status = req.body.status;
  const id = req.params.id;
  try{
    Tickets.findById(id, (err, updatedTicket) => {
      updatedTicket.progress = progress;
      updatedTicket.status = status;
      updatedTicket.save();
      console.log(`updatedTicket on the server: `,updateTicket)
      res.send("successfully updated")
    });
  } catch(err) {
    console.log(err)
  }
}

const deleteTickets = async (req, res) => {
  const id = req.params.id;
  await Tickets.findByIdAndRemove(id).exec();
  res.send("deleted");
};

module.exports = { getTickets,getTicket, createTickets, updateTicket, deleteTickets };
