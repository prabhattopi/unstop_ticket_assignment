// Find status false
const statusAggregation = [
    {
        $match: {
            status: false

        },


    }
    

]

const statusAggregationtrue = [
    {
        $match: {
            status: true

        },


    }
    

]

// Find false status of a row
function rowAggregation(row) {
    const rowAggregation = [
        {
           $match: {
                row: row,
                status: false
            }
        }
    ]

    return rowAggregation;

} 

function windowOfSeatsandUpdate(array) {
    const updatedWindow = [
        {
            $match: {
                seat_no: { $in: array }
            }
        },
        {
            $set: {
                status: true
            }
        },
    ]

    return updatedWindow
}

module.exports = { statusAggregation, windowOfSeatsandUpdate, rowAggregation, statusAggregationtrue }