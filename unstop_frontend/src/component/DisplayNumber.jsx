import useTicket from "../hooks/useTicket"

const DisplayNumber = ({ numberObj }) => {
    const { handleFunction } = useTicket()

    return (
        <div onClick={() => handleFunction(numberObj)} className={`${!numberObj.status ? "bg-green-500" : "bg-red-500"} rounded-md w-16 h-16 text-center flex justify-center items-center`}>
            <p className="text-white text-center">{numberObj.seat_no}</p>
        </div>
    )
}

export default DisplayNumber;
