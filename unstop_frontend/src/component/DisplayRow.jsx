import DisplayNumber from "./DisplayNumber"

const DisplayRow=({rowObj})=>{
  
  return (
      
      <div key={rowObj.key} className="flex gap-4 justify-center">
         {
             rowObj.numbers.map(e=>(
                 <DisplayNumber key={e._id} numberObj={e}/>
             ))
         }

          

      </div>
  )
}

export default DisplayRow