import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"


export default function Ficapacidades(props){
  // const url = 'https://localhost:5001/api/area'
    document.querySelector('title').textContent = 'Clinica | Registros';
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';

    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Incapacidades');
      }else{
        props.history.push('/');
      }
        },[]); 
    // Validations
    
    var formu = document.getElementById('quickForm1');
    const form =()=>{
        var a = false
        if(formu.days.value === ''){
          formu.days.className = classWarning
        } else{
          a = true
          formu.days.className = classSuccess
          formu.condition.className = classSuccess;
          formu.diagnostic.className = classSuccess;
        }
        
        if (a){
          SaveDataic(formu)
        }
    }

    const SaveDataic=(formu)=>{
      $.ajax({
          type: 'post', 
          url: 'https://localhost:5001/api/incapacidades',
          headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
          },
          data: JSON.stringify({
            cod_employed:formu.cod_employed.value.toUpperCase(),
            days:parseInt(formu.days.value),
            condition:formu.condition.value,
            diagnostic:formu.diagnostic.value,
            user_register:cookies.get('user'),
          }),
          success: function (res){
              console.log(res)
              toast.success(res,{duration: 6000, position:"top-right"})
              formu.cod_employed.value = ''
              formu.days.value = ''
              formu.condition.value = ''
              formu.diagnostic.value = ''

              formu.days.className = 'form-control form-control-border'
              formu.condition.className = 'form-control form-control-border'
              formu.diagnostic.className = 'form-control'
              //   window.location.href=('/Registro/Tipo/Producto')
          } 
      })
  }


    const selectitem=(a)=>{
      console.log(a.target.value.toUpperCase());
    }
    

    return (
        // 
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                {/* <h1 className="m-0">{cookies.get('user')}</h1> */}
                <h1>Incapacidades</h1>
                <div><Toaster/></div>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                  <li className="breadcrumb-item active">Incapacidades</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-md-11 ml-3">
              <div className="card card-primary shadow">
                <div class="card-header">
                    <h3 class="card-title">Registro <small>Incapacidades</small></h3>
                </div>
                <form id="quickForm1">
                  <div class="card-body mt-3">
                    <div className="row">
                        
                        <div class="form-group col-md-9">
                          <div class="input-group input-group-sm mb-3"> 
                            <div class="input-group-prepend">
                              <label class="input-group-text" for="inputGroupSelect01">Codigo empleado</label>
                            </div>
                            <select class=" custom-select  form-control-border js-data-example2 " name="cod_employed" onChange={selectitem} id='id_select_em'>
                            </select> 
                          </div>
                        </div> 
                        
                    </div>
                    <div className="row">
                      <div class="form-group col-md-2">
                          <input type="text" name="days" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Dias"/>
                          <div class="invalid-feedback">
                            Campo vacio.
                          </div>
                      </div>
                      <div class="form-group col-md-5">
                        <input type="text" name="condition" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Condicion"/>
                          <div class="invalid-feedback">
                            Campo vacio.
                          </div>
                      </div>
                        <div class="form-group col-md-7">
                          <label>Diagnostico</label>
                        <textarea class="form-control " name="diagnostic" rows="4" placeholder="Enter ..."></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="button" class="btn btn-primary" onClick={form}>Registrar</button>
                  </div>
                </form>
      
     
      <p className="mb-1">
       
      </p>
      
    </div>
              </div>
            </div>
          
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
        // 
    )


}