import React , {useEffect}from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"
const cookies = new Cookies();


const Correlative_Inc = () =>{
  $.ajax({
    type: "put", 
    url:`${cookies.get('server')}/api/incapacidades/${cookies.get('enterprise')}`,
    success:function(json_data) {  
      const cod = document.getElementById('n_tranzability')
      if (json_data !== 'Not Data'){
        cod.innerText = json_data[0]['correlative']
        cod.value = json_data[0]['correlative']
      }else{
        cod.innerText = 'No existen registros'
        cod.value = ''
      }
    }
  })
}
if(window.location.href === `${cookies.get('local')}Incapacidades`){
  Correlative_Inc()
}

export default function Ficapacidades(props){
  document.querySelector('title').textContent = 'Clinica | Registros';
  var classSuccess = 'form-control is-valid form-control-border';
  var classWarning = 'form-control form-control-border is-invalid';
  var classnormal = 'form-control form-control-border'
  
  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/Incapacidades');
    }else{
      props.history.push('/');
    }
      },[props.history]); 

  // Validations
  
  // Funcion para cambiar de estados los estilos
  const form =()=>{
      let formu = document.getElementById('quickForm1');
      let a,b = false
      if(formu.days.value === ''){
        formu.days.className = classWarning
      }else{
        a = true
        formu.days.className = classSuccess
      }
      
      if(formu.status_p.value === ''){
        
        formu.status_p.className = 'custom-control-input is-invalid'
      } else{
        b = true
        formu.status_p.className = 'custom-control-input is-valid'
        formu.condition.className = classSuccess;
        formu.diagnostic.className = classSuccess;
        formu.days_p.className = classSuccess;
        formu.date_p.className = classSuccess;
      }
      if (formu.date_from.value === ''){
        formu.date_from.className = classWarning
      }else{
        formu.date_from.className  = classSuccess
      }
      
      if (formu.date_to.value === ''){
        formu.date_to.className = classWarning
      }else{
        formu.date_to.className  = classSuccess
      }
      
      
      if (a && b){
        SaveDataic(formu)
      }
  }

  // Registro de incapacidades
  const SaveDataic=(formu)=>{
    let condition, time_p, diagnostic
    
    if(formu.condition.value === ''){
      condition = null
    }else{condition = formu.condition.value}

    if(formu.date_p.value === ''){
      time_p = ''
    }else{ time_p = formu.date_p.value}


    if(formu.diagnostic.value === ''){
      diagnostic = null
    }else{diagnostic = formu.diagnostic.value}

    $.ajax({
      type: 'post', 
      url: `${cookies.get('server')}/api/incapacidades`,
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
      data: JSON.stringify({
        cod_employed:formu.cod_employed.value.toUpperCase(),
        days:parseInt(formu.days.value),
        condition:condition,
        diagnostic:diagnostic,
        user_register:cookies.get('user'),
        status_p:parseInt(formu.status_p.value),
        date_p:time_p,
        days_p:formu.days_p.value,
        type_date:formu.type_date.value,
        date_from:formu.date_from.value,
        date_to:formu.date_to.value,
        n_tranzability:formu.n_tranzability.value
      }),
      success: function (res){
        toast.success(res,{duration: 6000, position:"top-right"})
        formu.cod_employed.value = ''
        formu.days.value = ''
        formu.condition.value = ''
        formu.diagnostic.value = ''
        formu.n_tranzability.value = ''
        Correlative_Inc()
        
        selectEmployed()
        formu.date_p.value = ''
        formu.days_p.value = ''
        formu.type_date.value = ''
        formu.status_p.value = ''
        formu.date_from.value = ''
        formu.date_to.value = ''

        formu.days.className = classnormal
        formu.condition.className = classnormal
        formu.diagnostic.className = classnormal
        formu.date_p.className = classnormal
        formu.days_p.className = classnormal
        formu.status_p.className = classnormal
        formu.date_from.className = classnormal
        formu.date_to.className = classnormal
        formu.n_tranzability.className = classnormal
      }, error: function(error){
        console.log(error.responseText)
      } 
    })
  }

    
  // Selects
  // Select de empleados
  const selectEmployed=()=>{
    let em = document.getElementById('id_select_em')
    if (em != null){
      let options = document.querySelectorAll('#id_select_em option');
      options.forEach(o => o.remove());
      $.ajax({
        type: "GET", 
        url:`${cookies.get('server')}/api/empleados/${cookies.get('enterprise')}`,
        success:function(json_data) {  
          const po = document.createElement('option') 
          if (json_data !== 'Not Data'){
            po.value = ''
            po.text = '------ Seleccione -------'
            em.appendChild(po)
            for (let i = 0; i < json_data.length; i++) {
              const option = document.createElement('option')
              option.value = json_data[i]['exp_codigo_alternativo']
              option.text = json_data[i]['exp_codigo_alternativo']+' '+json_data[i]['exp_nombres_apellidos']+' | '+json_data[i]['departamento']
              em.appendChild(option);
            }
          }else{
            po.value = ''
            po.text = 'No existen registros'
          }
        }
      })
    }
  }

  return ( 
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
                {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Inicio</a>
                  </li>
                }
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
                      
                      <div class="form-group col-md-10">
                        <div class="input-group input-group-sm mb-3"> 
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01"> <span className="fas fa-user-injured mr-2" /> Codigo empleado</label>
                          </div>
                          <select class=" custom-select  form-control-border js-data-example2 " name="cod_employed"  id='id_select_em'>
                          </select> 
                        </div>
                      </div> 
                      <div class="form-group col-md-2 mr-0">
                        <input type="text" name="n_tranzability" class="form-control form-control-border " id="n_tranzability" disabled placeholder="n_tranzability"/>
                        <div class="invalid-feedback">
                          Campo vacio.
                        </div>
                    </div>
                      <div class="form-group col-md-4" id="fechae">
                          <label> <span className="fas fa-calendar mr-2" /> Fecha de Inicio:</label>
                          <div class="input-group date"  data-target-input="nearest">
                              <input type="date" class="form-control form-control-border" name="date_from"/>
                          </div>
                      </div>
                      <div class="form-group col-md-4" id="fechae">
                          <label> <span className="fas fa-calendar mr-2" />Fecha de Finalizacion:</label>
                          <div class="input-group date"  data-target-input="nearest">
                              <input type="date" class="form-control form-control-border" name="date_to"/>
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
                    <div class="col-sm-3  ml-3 mt-0">
                      <div class="form-group">
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input " value="1" type="radio" id="customRadio1" name="status_p"/>
                              <label for="customRadio1"  class="custom-control-label">Permanente</label>
                          </div>
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input" value="0" type="radio" id="customRadio2" name="status_p" />
                              <label for="customRadio2" class="custom-control-label">Temporal</label>
                          </div>
                          <div class="invalid-feedback">
                            Campo vacio.
                          </div>
                      </div>
                    </div>
                  </div>
                  
                  <div id="accordion">
                    
                    <div class="card card-muted  border-light rounded-lg">
                    <div class="card-header">
                      <h4 class="card-title w-100">
                        <a class="d-block w-100" data-toggle="collapse" href="#collapseTwo">
                          Permisos
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        <div className="row">
                          <div class="form-group col-md-4" id="fecha">
                            <label><span className="fas fa-calendar mr-2" />Fecha permiso</label>
                            <div class="input-group date" >
                              <input type="date" class="form-control form-control-border" name="date_p"/>
                            </div>
                          </div>
                          <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                              <input type="text" name="days_p" class="form-control form-control-border"  placeholder="Dias"/>
                              <div class="invalid-feedback">
                                Campo vacio.
                              </div>
                          </div>
                          <div class="col-sm-3  ml-3 mt-3">
                      <div class="form-group">
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input " value="1" type="radio" id="customRadio12" name="type_date"/>
                              <label for="customRadio12"  class="custom-control-label">AM</label>
                          </div>
                          <div class="custom-control custom-radio ">
                              <input class="custom-control-input" value="0" type="radio" id="customRadio22" name="type_date" />
                              <label for="customRadio22" class="custom-control-label">PM</label>
                          </div>
                          <div class="invalid-feedback">
                            Campo vacio.
                          </div>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  

                    <div class="form-group col-md-10">
                        <label><span className="fas fa-stethoscope mr-2" />Diagnostico</label>
                      <textarea class="form-control form-control-border" name="diagnostic" rows="4" placeholder="Enter ..."></textarea>
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
  )
}