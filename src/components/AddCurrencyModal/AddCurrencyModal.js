import React, { useEffect,useState } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const AddCurrencyModal = ({showModal,setShowModal,setCurrency}) => {
  const[datas,setDatas] = useState([])
  const [current,setCurrent]= useState("")
  useEffect(()=>{
    axios.get("https://api.nbp.pl/api/exchangerates/tables/a/today/").then((res)=>{
      setDatas(res.data[0].rates);
    }).catch((e)=>{
      console.log(e);
    })
  },[])

  const handleOnChange=(value)=>{
    setCurrent(value);
  }

  
  const handleAddCurrency=()=>{
    function handle() {
        let xData = JSON.parse(localStorage.getItem("x"))
        // Loading
        var currencies = JSON.parse(localStorage.getItem("currency") || "[]");
        // data
        console.log(xData);
        var data = {
            id: Math.floor(Math.random() * 1000000),
            currency:current,
            codes: xData.code,
            rate: xData.mid
        };
        currencies.push(data);
        console.log(data);
        // Save to storage
        localStorage.setItem("currency", JSON.stringify(currencies));
        setCurrency(prev=>[...prev,data])
       }
       handle()
       setShowModal(false)
       cogoToast.success("Currency Added Successfully.")

    }

    return (
        <>
          {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-500">
                    Add Currency
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <input ref={(input)=>currency=input} type="text" placeholder='Currency Name' className='border-[2px] py-3 pl-2 focus:outline-none w-full mb-3' /> */}
                  <select className='focus:outline-none border-2 px-4 py-2' onChange={(e)=>handleOnChange(e.target.value)}>{
                    datas.map( (x,y) =>{
                      if(current === x.currency){
                        localStorage.setItem("x",JSON.stringify(x))
                      }
                      return  <option key={x.currency}>{x.currency}</option>
                    })
                  }</select>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAddCurrency}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}  
        </>
    );
};

export default AddCurrencyModal;