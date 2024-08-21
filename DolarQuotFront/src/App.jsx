import { useState } from 'react'
import './App.css'
import Carddolar from './components/Carddolar'
import { Box, Button, Container, Heading, Image, Stack } from '@chakra-ui/react'

function App() {
   //inicia State de array vazio para cards
   const [Valores, setValores] = useState([]);
   //inicia State vazio para input
   const [description, setDescription] = useState("");
   //faz requisição pro servidor colocando valor do dolar na variável resposta
   const onSubmitForm = async(e) =>{
      e.preventDefault()
      let resposta = ""
      try{
         const body = {description};
         await fetch("http://localhost:3000/GetQuotation",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
         })
         .then(response=>response.json())
         .then(data=>{resposta=data})
         }catch (err){
         console.error(err.message)
         alert('valor indisponível')
         return
         }

         //checa array de cards para evitar duplicação
         let isPresent = Valores.some(function(el){ return el.data === description});
         if(!isPresent){
            setValores([...Valores,{data: description,valor: resposta}]);
         }else{
            alert('data já escolhida')
         } 
   }
    
  return (
    <>
         <Container centerContent>
            <Box mt={'30px'} mb={'10px'} display={'flex-column'} alignItems={'center'} justifyContent={'center'}>
               <Image src='dinero.png' h={'200px'} w={'230px'}/>
               <Heading textAlign={'center'} mt={'16px'}>DolarQuot 1.0</Heading>
            </Box>
            <Box display={'flex-column'} width={'540px'} padding={'10px'} alignItems={'center'} justifyContent={'center'}>
            <form onSubmit={onSubmitForm} name="data" id="data">
               <Stack direction={'column'}>
               <input type='date' className='h-12  rounded p-1 text-2xl font-bold bg-gray-50 text-gray-900 text-center' value={description} onChange={e=>setDescription(e.target.value)}/>
               <Button  w={'60%'} type='submit' marginTop={'5px'} colorScheme='green' marginX={'auto'}>Enviar Data</Button>
               </Stack>
            </form>
            </Box>
            <Box maxWidth={'540px'} padding={'10px'}>
               <div className='flex flex-wrap w-full justify-center items-center bg-gray-100 px-2 rounded-md'>
                  { 
                  //mapeia array de valores para reproduzir os cards
                     Valores.map((item,index)=>{
                        return(
                           <Carddolar
                           key={index}
                           data={item.data}
                           valor={item.valor}
                           />
                        )
                     })
                  }
               </div>
            </Box>
         </Container>
    </>
  )
}

export default App
