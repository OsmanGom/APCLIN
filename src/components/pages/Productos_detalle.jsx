import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import Selectr from '../common/Selectr'




export default function Produtos_D(props) {
    document.querySelector('title').textContent = 'Clinica | Detalle Productos';
    
    const cookies = new Cookies();
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Detalle/Productos');
      }else{
        props.history.push('/');
      }
    },[]); 


    // 
    var s = document.getElementById('idselect')
    const selectData=()=>{
      
    if (s != null){
      $.ajax({
        type: "GET", 
        url: "https://localhost:5001/api/tipo_producto",
      
        success: function(json_data) {  
          const op = document.createElement('option') 
          op.value = ''
          op.text = '------ Seleccione -------'
          s.appendChild(op)
          for (let i = 0; i < json_data.length; i++) {
            const option = document.createElement('option')
            option.value = json_data[i]['id_type_p']
            option.text = json_data[i]['description_typeP']+' '+json_data[i]['unid_med']
            s.appendChild(option);
          }
        }
      })
    }
    }

    const remove_data=()=>{
      const  s = document.querySelectorAll('#idselect option')
      s.forEach(o => o.remove());
    }

    document.body.addEventListener("keydown", function(event) {
      // console.log(event.code, event.keyCode);
      if (event.code === 'Escape' || event.keyCode === 27) {
        // Aqui la lógica para el caso de Escape ...
        remove_data()
      }
    });
    
    // 

    // Save data for method post =>>> ajax
      const SaveData=()=>{
        console.log($('#formdata').serialize())
        
        
          // $.ajax({
          //   type: "POST", 
          //   url: "https://localhost:5001/api/productos",
          //   data: $('#formdata').serialize(),
          //   success: function (data){
          //      alert('Datos enviados !!!'); 
          //     } 
          // }).error(function (){
          //   console.log('error')
          // });
      }
    // 


    return (
      
      <><div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Detalle Productos</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                  <li className="breadcrumb-item active">Detalle Productos</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>

        {/*Sections of tables  */}
        <section className="content">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex">
                    <h1 className="card-title">Tabla Prodcutos</h1>
                    <button type="button" class="btn btn-primary btn-sm ml-auto" data-toggle="modal" data-target="#modal-product"  onClick={selectData}>
                        Agregar Producto
                    </button>
                  </div>
                  <div className="card-body table-responsive">
                    <table id="example1" className="table table-bordered table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Codigo Producto</th>
                          <th>Tipo de producto</th>
                          <th>Nombre de producto</th>
                          <th>Nombre Completo</th>
                          <th>Unidad de medida</th>
                          <th>Usuario de transacción</th>
                          <th>Fecha de creacion</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Codigo Producto</th>
                          <th>Tipo de producto</th>
                          <th>Nombre de producto</th>
                          <th>Nombre Completo</th>
                          <th>Precio de unidad</th>
                          <th>Usuario de transacción</th>
                          <th>Fecha de creacion</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>{/* /.col */}
                </div>
              </div>
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </section>

      </div>
      {/* Modal register product */}
      <div class="modal fade" id="modal-product" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header bg-info">
              <h5 class="modal-title" >Registro Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={remove_data}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id='formdata'>
                {/*  */}
                <div className="row">
                        
                        
                        <div class="form-group col-md-5">
                            <label>Tipo Producto</label>
                            <div className="select2-purple">
                                <select className='form-control select2' id='idselect' name='id_type_p' >
                                  
                                </select>
                            </div>
                            
                            <div class="invalid-feedback">
                                Campo vacio.
                            </div>
                        </div> 
                      
                    
                        <div class="form-group col-md-6 mt-4 mr-4">
                            
                            <input type="text" name="name_product" class="form-control form-control-border" placeholder="Nombre Producto"/>
                            <div class="invalid-feedback">
                                Campo vacio.
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                            
                            <input type="text" name="full_name" class="form-control form-control-border " placeholder="Nombre Completo"/>
                            <div class="invalid-feedback">
                                Campo vacio.
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            
                            <input type="text" name="unit_price" class="form-control form-control-border ml-2"  placeholder="Precio Unidad"/>
                            <div class="invalid-feedback">
                                Campo vacio.
                            </div>
                        </div>
                        
                    </div>
                    
                {/*  */}
                  <div class="modal-footer  justify-content-between">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={remove_data}>Cancelar</button>
                    <button type="button" name="user_register" value={cookies.get('user')} class="btn btn-primary" onClick={SaveData}>Registrar</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      </>

    )
  
  }