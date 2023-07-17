// Find status false
const statusAggregation = [
    {
        $sort: {
            row: 1,
            seat_no: 1
        }
    },
    {
        $match: {
            status: false

        },


    }


]

const statusAggregationtrue = [
    {
        $sort: {
            row: 1,
            seat_no: 1
        }
    },
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
            $sort: {
                seat_no: 1
            }
        },
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
            $sort: {
                row: 1,
                seat_no: 1
            }
        },
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