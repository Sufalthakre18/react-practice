
import React, { useState } from 'react'

function Project2() {

    const [num, setNum] = useState(10)
    const [user, setUser] = useState({ "name": "sidhu", age: 27 })
    const [arr, setArr] = useState([10,20,30,40])
    const [num2, setNum2] = useState(25)
    const [title, setTitle] = useState('')
    const [submittedTitle, setSubmittedTitle] = useState('');

    const increase = (num) => {
        setNum(num + 1)
    }

    const decrease = (num) => {
        setNum(num - 1)
    }

    const increaseBy5 = (num) => {
        setNum(num + 5)
    }

    const changeUser=()=>{
        setUser(prev=>({name:"Aujla",age:99}))
    }
    
    const changeArr=()=>{
        setArr(prev=>([...prev,99]))
    }
    const changeNum2=()=>{
        setNum2(prev=>(prev+2))
        setNum2(prev=>(prev+2))
        setNum2(prev=>(prev+2))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(title);
        setSubmittedTitle(title);
        console.log("form submitted by ",title);
        
        setTitle('')
    }
    

    return (<>
        <div className='bg-slate-200'>

            <h1>Couter using useState</h1>
            <div className='flex flex-col justify-center w-1/2  gap-5'>

                <div className='flex justify-center items-center m-14 rounded-4xl   bg-sky-400 text-6xl text-black'>
                    <h1 className=' text-8xl'>{num}</h1>
                </div>
                <button onClick={() => { increase(num) }} className=' bg-sky-200 rounded-4xl'>Increase</button>
                <button onClick={() => { decrease(num) }} className=' bg-sky-200 rounded-4xl'>Decrease</button>
                <button onClick={() => { increaseBy5(num) }} className=' bg-sky-200 rounded-4xl'>IncreaseBy5</button>

            </div>
        </div>
        <div className='bg-slate-300'>
            <h1>Batch update,object and array upadte using useState</h1>
            <div className='flex w-1/2 p-8 flex-col gap-4'>


                <h1 className=' text-8xl'>{user.name} {user.age} </h1>
                <button onClick={() => { changeUser() }} className=' bg-sky-200 rounded-4xl'>Change user</button>

            </div>
            <div className='flex w-1/2 p-8 flex-col gap-4'>
                <h1 className=' text-8xl'>{arr}</h1>
                <button onClick={changeArr} className=' bg-sky-200 rounded-4xl'>Change arr</button>

            </div>
            <div className='flex w-1/2 p-8 flex-col gap-4'>
                <h1 className=' text-8xl'>{num2}</h1>
                <button onClick={changeNum2} className=' bg-sky-200 rounded-4xl'>Change arr</button>

            </div>
        </div>

        <div className='bg-slate-400'>
            <h1>Live Preview:- { title}</h1>
            <h1>Final Value :- {submittedTitle}</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='border-2 p-2 rounded-2xl m-7' placeholder='enter your name' />
                <button className='rounded-2xl bg-amber-500 text-black px-4 p-2' type='submit'>Submit</button>
            </form>
        </div>
    </>

    )
}

export default Project2