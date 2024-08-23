import React from 'react'

export default function Carddolar(props) {
  return (
   <>
   <div className='flex-col h-36 w-40 bg-white aligns-bottom rounded-lg mx-1 my-2 items-top justify-center'>
      <section className='flex-col w-full h-full bg-green-800 rounded-md items-center justify-center shadow'>
         <div className='flex-col w-full items-center justify-center pt-2'> 
            <h1 className='text-gray-100 font-semibold text-xl text-center leading-none '> · {props.data} ·</h1>
            <h1 className='text-gray-300 font-regular text-xs text-center leading-none '>  (aaaa-mm-dd)</h1>
         </div>
         <div className='flex-col w-full items-center justify-center px-2 py-2 '>
            <div className='flex-col w-full h-20 items-center justify-center text-center rounded-lg bg-gray-100 p-1'>
            <h1 className='text-gray-800 font-semibold text-xs text-center pt-2'> Cotação em Reais: </h1>
               <h1 className='text-green-600 font-bold text-2xl'> {props.valor}</h1>
            </div>
         </div>
      </section>
   </div>
   </>   
  )
}
