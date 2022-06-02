const mongoose = require("mongoose");

const TicketsSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    priority: String,
    owner: String,
    progress: Number,
    avatar:String,
    status:String,
});

const Tickets = mongoose.model("tickets", TicketsSchema);
module.exports = Tickets;
