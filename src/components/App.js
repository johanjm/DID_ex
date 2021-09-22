
import React, {Fragment, useEffect,useState} from 'react';
import '../Styles/App.css';



function App() {
  const [AlAD, SetAlAD] = useState()
  const [AlID, SetAlID] = useState()
  const [IdAD, SetIdAD] = useState([])
  const [BusAD, SetIbusAD] = useState([])
 
  const hola =[
    {id: 1, advice: 'Remember that spiders are more afraid of you, than you are of them.'},
    {id: 2, advice: 'No Remember that spiders are more afraid of you, than you are of them.'},
    {id: 3, advice: 'R more afraid of you, than you are of them.'},
    {id: 4, advice: 'No Remember that spiders are more afraid of them.'}
  ];

  const [data, SetData] = useState(hola);

  const [select, setSelect]= useState({
    id:'',
    advice:''
  } 
  )
  
  const eliminar =(elemento) =>{
    SetData(data.filter(cod=>cod.id !=elemento))
  }

 

  const AdviAL= async (text) => {
    const url = await fetch('https://api.adviceslip.com/advice/search/'+text)
    const alet= await url.json()
    console.log(alet.slips)
    SetIbusAD(alet);

    //SetAlAD(aleto.advice)
    //SetAlID(aleto.id)
    //console.log();
  }
  const insertar =async (estado)=>{
    const url = await fetch('https://api.adviceslip.com/advice')
    const alet= await url.json()
    const aleto = alet.slip
    console.log(aleto);
    SetAlAD(aleto.advice)
    switch(estado){
      case "next":
        estado =null;
        break;
      case "add":
        var valorInsertar={id: aleto.id,advice: aleto.advice};
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        SetData(dataNueva);
        console.log(valorInsertar)
        break;
    }
      
  }

  useEffect(() => {
    insertar();
  },[])
  
  return (
    <>
    <div id="cab">
      <div id="mitad">
        <p class="titulo">Consejo del día</p><tr />
        <p>{AlAD}</p><tr />
        ---{AlID}---
        <div id="cab"><div id="mitad1"><button class="boton1" onClick={()=>insertar("add")}>Marcar como favorito</button> </div>
        <div id="mitad1"> <button class="boton1"onClick={()=>insertar("next")}  >Siguiente consejo</button></div>
        </div>
      </div>



      <div id="mitad">
          <p class="titulo">Consejos Favoritos</p><tr />
          <table>
            <thead>
              <tr>
                <th>Advice</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map(elemento => (
                  <tr>
                    <td>{elemento.advice}</td>
                    <td><button class="boton1" onClick={()=>eliminar(elemento.id)}>Eliminar</button></td>
                  </tr>))}
              
            </tbody>
          </table>
        </div>
    </div>




    <div id="cab">
    <p class="titulo">Buscador de Consejos</p><tr />
    
    </div>
    
    
    <div id="cab">
    <p> *Palabra clave: </p><input></input><tr/>
    <button class="boton1" onClick={()=>AdviAL("fun")}>Buscar</button><tr/>
    </div>
    
    
    
    <div id="cab">
    <p class="titulo">Resultados de la busqueda</p><tr />
    

    </div>



    </>
    
       
  )  
}




export default App;
