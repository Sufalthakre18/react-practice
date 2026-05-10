import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, incrementByAmount } from "./redux/features/counterSlice"
import { useState } from "react"

function App() {
  const disptach = useDispatch()
  const count = useSelector((state)=>state.counter.value)
  const [num, setNum] = useState(5)
return (
    <>
  <h1>{count}</h1>
  <button onClick={()=>{
      disptach(increment())
  }}>Increment</button>
  <button onClick={()=>{
      disptach(decrement())
  }}>Decrement</button>
  <input type="number" value={num} onChange={(e)=>setNum(e.target.value)}  />
  <button onClick={()=>{
    disptach(incrementByAmount(Number(num)))
  }}>IncrementBy amount</button>


   </>
  )
}

export default App
