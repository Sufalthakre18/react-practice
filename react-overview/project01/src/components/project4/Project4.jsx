import axios from 'axios'
import { useEffect, useState } from 'react';
import Card from './components/Card';

function Project4() {

    const [users, setUsers] = useState([])
    const [index, setIndex] = useState(2)


    const getData = async () => {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
        setUsers(response.data)
        console.log(response.data);
    }


    useEffect(() => {
        getData()
    }, [index])

    let printuserData = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

    if (users.length > 0) {
        printuserData = users.map((ele, idx) => {
            return <div key={idx}>
                <Card elem={ele} />
            </div>

        })
    }


    return (
        <div className='bg-black  flex flex-col h-screen p-4 text-white'>
            <div className='flex-1 overflow-auto p-4'>
                <div className='flex flex-wrap gap-4'>
                    {printuserData}
                </div>
            </div>

            <div className='flex justify-center gap-6 items-center p-4 '>
                <button className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
                    style={{ opacity: index == 1 ? 0.6 : 1 }}
                    onClick={() => {
                        if (index > 1) {
                            setIndex(index - 1)
                            setUsers([])
                        }
                    }}
                >
                    Prev
                </button>
                <h4>Page {index}</h4>
                <button
                    className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
                    onClick={() => {
                        setIndex(index + 1)
                        setUsers([])

                    }}
                >
                    Next
                </button>
            </div>
        </div>

    )
}

export default Project4