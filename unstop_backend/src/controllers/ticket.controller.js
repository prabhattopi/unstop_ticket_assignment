const Ticket = require('../models/ticket.model');
const mongoQuery = require("../mongoAggregation")
const logic = require("../logicDSA")
exports.createTicket = async (req, res) => {

    let { seat_no } = req.body;
    seat_no = Number(seat_no)
    try {
        if (!seat_no) {
            return res.status(404).json({ message: "Please type something" })
        }
        if (seat_no > 7) {
            return res.status(404).json({ message: "No should not be greater than 7" })
        }

        let newTicket = await Ticket.aggregate(mongoQuery.statusAggregation)
        if (newTicket.length == 0) {
            return res.status(404).json({ message: "All tickets are Booked" })
        }
        if (newTicket.length < seat_no) {
            return res.status(404).json({ message: "No of seats are not avilable please use less Number" })
        }
        let row = 1
        let flag = false
        while (row <= 12) {
            let newRowTicket = await Ticket.aggregate(mongoQuery.rowAggregation(row))


            if (newRowTicket.length >= seat_no) {

                let cuncurrentArray = await logic.cuncurrentRow(seat_no, newRowTicket)

                if (cuncurrentArray) {
                    let seatsNumber = cuncurrentArray.map((e) => e.seat_no)
                    console.log(seatsNumber)
                    flag = true
                    const modified = await Ticket.updateMany(
                        { seat_no: { $in: seatsNumber } },
                        { $set: { status: true } },
                        { sort: { row: 1, seat_no: 1 } }
                     
                    );
                    // console.log(modified)
                    return res.status(200).json({ message: "successfully booked ticket", data: seatsNumber })
                }
            }
            row++


        }

        if (!flag) {
            let filternewTicket = newTicket.map((e) => e.seat_no)
            let slidingWindow = logic.SlidingWindow(seat_no, filternewTicket)

            await Ticket.updateMany(
                { seat_no: { $in: slidingWindow } },
                { $set: { status: true } },
                { sort: { row: 1, seat_no: 1 } }
   
            );
            return res.status(200).json({ message: "successfully booked ticket", data: slidingWindow })





        }
    }
    catch (err) {
        return res.status(404).json({ message: "Something error occured" })

    }


};

exports.getAllTickets = (req, res) => {
    Ticket.find().sort({row:1,seat_no:1})
        .then((Tickets) => {

            res.send(Tickets);
        })
        .catch((error) => {
            console.error('Failed to fetch Tickets:', error);
            res.status(500).send('Failed to fetch Tickets');
        });
};

exports.getSingleTicket = (req, res) => {
    const TicketId = req.params.id;

    Ticket.findById(TicketId)
        .then((Ticket) => {
            if (!Ticket) {
                res.status(404).send('Ticket not found');
            } else {
                res.send(Ticket);
            }
        })
        .catch((error) => {
            console.error('Failed to fetch Ticket:', error);
            res.status(500).send('Failed to fetch Ticket');
        });
};

exports.updateTicket = async (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const ticket = await Ticket.findOne({ _id: itemId })

    if (ticket.status == true) {
        Ticket.findByIdAndUpdate(itemId, updatedItem, { sort: { row: 1, seat_no: 1 } })
            .then(() => {

                return res.status(200).json({ message: 'Ticket updated successfully' });


            })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed to update item' });
            });
    }
    else {
        return res.status(500).json({ message: 'Item is already updated' });
    }


};

exports.deleteTicket = async (req, res) => {
    try {
        let newTicket = await Ticket.aggregate(mongoQuery.statusAggregationtrue)

        if (newTicket.length > 0) {
            await Ticket.updateMany({}, { $set: { status: false }, }).sort({row:1,seat_no:1});
            res.status(200).json({ message: "All tickets updated successfully" });
        }
        else {
            res.status(500).json({ message: "All tickets are unbooked" });
        }

    } catch (error) {

        res.status(500).json({ message: "Failed to update tickets" });
    }
};

