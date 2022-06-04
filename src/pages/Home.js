import React, { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import {FaTrash, FaPlus} from 'react-icons/fa'
import AddCurrencyModal from '../components/AddCurrencyModal/AddCurrencyModal';

const Home = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [currency,setCurrency] = useState([])

    useEffect(()=>{
        function currency(){
            return setCurrency(JSON.parse(localStorage.getItem("currency") || "[]"))
        }
        currency()
    },[])

    const handleDelete=(id)=>{
        const confirmation = window.confirm('Are you sure you want to delete?')
        if(confirmation){
            const currencyLocal = JSON.parse(localStorage.getItem("currency"))
            const newLocal = currencyLocal.filter(item=>(item.id !== id))
            localStorage.setItem("currency",JSON.stringify(newLocal))
            setCurrency(currencyLocal.filter(item=>(item.id !== id)))
            cogoToast.success('Currency Delete Success.')
        }
        
    }

    const handleRemoveAll=()=>{
        const confirmation = window.confirm('Want to remove all currencies?')
        if(confirmation){
            localStorage.removeItem("currency")
            setCurrency([])
            cogoToast.success("All Currencies Removed.")
        }
        
    }
    
    return (
        <div className='px-10'>
            <div className='py-10 text-center'>
                <h2 className='text-4xl font-medium text-gray-600'>Favourite Currency Lists</h2>
                <span className='block mx-auto bg-green-500 w-28 h-[3px] mt-2'></span>
                <span className='block mx-auto bg-green-500 w-3 h-3 rounded-full -mt-2'></span>
            </div>
            <div className='text-right mb-10'>
                <button onClick={() => setShowModal(true)} className='border-2 bg-green-500 text-white px-2 outline-none rounded-full hover:bg-green-600 mr-1 transition duration-300 font-medium py-1'><FaPlus className='inline-block text-sm mb-1' /> Add Currency</button>
                <button onClick={handleRemoveAll} className='border-2 bg-red-400 text-white px-2 outline-none rounded-full hover:bg-red-500 transition duration-300 font-medium py-1'> <FaTrash className='inline-block text-sm mb-1' /> Remove All</button>
            </div>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Serial No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Currency
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Code
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Rate
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    currency?.length >0 && <tbody className="bg-white divide-y divide-gray-200">
                                
                                    {
                                        currency?.map((item,index)=>{
                                            return <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        <div className="text-sm font-medium text-gray-900">{index+1}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">{item.currency}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">{item.codes}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                   {item.rate}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <FaTrash onClick={()=>handleDelete(item.id)} className='text-red-500 cursor-pointer text-base inline-block'/>
                                            </td>
                                        </tr>
                                        })
                                    }
                            </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                currency?.length === 0 && <div>
                    <p className='py-10 text-center text-gray-500 w-full'>No Content to show !</p>
                </div>
            }
            <AddCurrencyModal showModal={showModal} setShowModal={setShowModal} setCurrency={setCurrency} />
        </div>
    );
};

export default Home;