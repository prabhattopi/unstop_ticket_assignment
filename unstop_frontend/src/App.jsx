import DisplayRow from './component/DisplayRow'
import FormComponent from './component/FormComponent'
import useTicket from './hooks/useTicket'

function App() {
    const { tickets,loading } = useTicket()
    console.log(loading)
    console.log(tickets)

    return (
        <div className="flex flex-col sm:flex-row justify-around gap-16 py-8 px-8">
            <div className="flex flex-col gap-8 py-8 px-8">
                {
                    loading?(<div classNmae="font-bold flex justify-center items-center text-lg w-1/2">Loading</div>):(
                        tickets?.map(e => (
                            <DisplayRow key={e.key} rowObj={e} />
                        ))
                    )
                }
              
            </div>
            <div className="flex justify-center sm:w-full">
                <div className="relative w-full sm:w-1/2 sm:fixed">
                    <FormComponent />
                </div>
            </div>
        </div>
    )
}

export default App;
