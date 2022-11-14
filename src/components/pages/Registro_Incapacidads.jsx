import React , {useEffect}from "react";
import Cookies from 'universal-cookie';



export default function Ficapacidades(props){
  // const url = 'https://localhost:5001/api/area'
    document.querySelector('title').textContent = 'Clinica | Incapacidades';
    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Incapacidades');
      }else{
        props.history.push('/');
      }
        },[]); 
    // Validations
    var class1 = 'form-control form-control-border is-invalid';
    const form = ()=>{
        var formu = document.getElementById('quickForm');
        
        if(formu.codigo.value === ''){
            formu.codigo.className = 'js-data-example-ajax is-invalid'
        } if(formu.nombre.value === ''){
            formu.nombre.className = class1;
        }if(formu.identidad.value === ''){
            formu.identidad.className = class1
        }if(formu.dias.value === ''){
            formu.dias.className = class1;
        }if(formu.condicion.value === ''){
            formu.condicion.className = class1;
        }
        
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
              <div className="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Registro <small>Incapacidades</small></h3>
                </div>
                <h3 class="text-danger ml-5 mt-2" id="validationL">xx</h3>
                <form id="quickForm">
                    <div class="card-body">
                        <div className="row">
                        
                        
                            <div class="form-group col-md-5">
                                <label>Codigo</label>
                                <select class="js-data-example-ajax " name="codigo"></select>
                                <div class="invalid-feedback">
                                    Campo vacio.
                                </div>
                            </div> 
                          
                        
                            <div class="form-group col-md-6">
                                
                                <input type="text" name="nombre" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Nombre"/>
                                <div class="invalid-feedback">
                                    Campo vacio.
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                
                                <input type="text" name="identidad" class="form-control form-control-border"id="exampleInputPassword1" placeholder="Identidad"/>
                                <div class="invalid-feedback">
                                    Campo vacio.
                                </div>
                            </div>
                            <div class="form-group col-md-1">
                                
                                <input type="text" name="dias" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Dias"/>
                                <div class="invalid-feedback">
                                    Campo vacio.
                                </div>
                            </div>
                            <div class="form-group col-md-5">
                                
                                <input type="text" name="condicion" class="form-control form-control-border" id="exampleInputPassword1" placeholder="Condicion"/>
                                <div class="invalid-feedback">
                                    Campo vacio.
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div class="form-group col-md-6">
                             <label>Diagnostico</label>
                            <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
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