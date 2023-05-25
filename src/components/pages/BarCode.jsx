import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";



const cookies = new Cookies();


export default function BarCode(props) {
    document.querySelector('title').textContent = 'Clinica | Barcode';
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/barcode');
      }else{
        props.history.push('/');
      }
    },[props.history]); 

    //  Funcion para generar el codigo de barras
    const generaqr = () =>{
      let cod = document.getElementById('id_select_pro').value
      let img = document.getElementById('idimg')
      img.src = `https://barcode.tec-it.com/barcode.ashx?data=${cod}&code=Code128`
      
    }
    // Funcion para descargar el codigo de barras
    const donwloadImg = () =>{
      let img = document.getElementById('idimg')
      let a = document.getElementById('idaimg')
      if(document.getElementById('id_select_pro').value !== ''){
        a.href = `${img.src}&download=true`
        a.download = true;
        a.target = '_self';
        a.click()
        document.getElementById('id_select_pro').value = ''
        
      }
   }
  return (
    <div className="hold-transition login-page">
      <div className="col-5 ">
        <div className="card mt-4 card-danger card-outline ">
          <div className="card-body login-card-body shadow rounded">
            <p className="login-box-msg">Generar codigo de barras</p>
            <p class="text-danger" id="validationL"></p>
            <form >
              
              <div class="form-group col-md-13" >
                <label>Producto</label>
                <select class="js-data-example" id="id_select_pro">
                </select>
              </div>
              
              <div id="htmli" className='col-8'>
       
                <label className='text-dark'>Producto</label>
                <a href id='idaimg'>
                
                  <img alt='Barcode Generator'  width={'350px'} height={'150px'}id='idimg'/>
                </a>
              </div>
              
                  
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-primary btn-sm" onClick={generaqr}> <span className="fas fa-barcode mr-2" /> Generar codigo
                </button>

                <button type="button" className="btn btn-success btn-sm " onClick={donwloadImg}><span className="fas fa-download mr-2" />Descargar codigo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  
}
