import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import { createElement } from 'react';

const cookies = new Cookies();


export default function BarCode(props) {
    document.querySelector('title').textContent = 'Clinica | Zemaforizacion';
    
    
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/barcode');
      }else{
        props.history.push('/');
      }
    },[]); 

    const generaqr = () =>{
        let cod = document.getElementById('idcode').value
        let img = document.getElementById('idimg')
        img.src = `https://barcode.tec-it.com/barcode.ashx?data=${cod}&code=Code128`
    }

    const donwloadImg = () =>{
        let img = document.getElementById('idimg')
        let a = document.getElementById('idaimg')
        if(document.getElementById('idcode').value !== ''){
            a.href = `${img.src}&download=true`
            a.download = true;
            a.target = '_self';
            a.click()
            document.getElementById('idcode').value = ''
        }
    }
    return (
<div className="hold-transition login-page">
   <div className="login-box">
      <div className="card mt-4 card-danger card-outline ">
    <div className="card-body login-card-body shadow rounded">
      <p className="login-box-msg">Generar codigo de barras</p>
      <p class="text-danger" id="validationL"></p>
      <form >
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Codigo" name='idcode' id="idcode"  required/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-barcode" />
            </div>
          </div>
          <div class="invalid-feedback">
            Campo vacio.
          </div>
        </div>
            <a href="#" id='idaimg'>

                <img alt='Barcode Generator' width={'300px'} height={'100px'} id='idimg'/>

            </a>
            
          
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-primary btn-sm" onClick={generaqr}> <span className="fas fa-barcode mr-2" /> Generar codigo
            </button>
            <button type="button" className="btn btn-success btn-sm " onClick={donwloadImg}><span className="fas fa-download mr-2" />Descargar codigo
            </button>
          </div>
      </form>
      
      
      {/* /.social-auth-links */}
      
      
    </div>
    {/* /.login-card-body */}
  </div>

</div>
</div>
 
 )
  
}
