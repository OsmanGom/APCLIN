import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "alertify.min.js"



$(document).ready(function () {
  var t = $('#example1').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
  },
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/productos",
   
    success: function(json_data) {
      if (json_data !== 'Not Data'){

        for (let i = 0; i < json_data.length; i++) {
          t.row.add([
            json_data[i]['cod_prod'], 
            json_data[i]['description_typeP'], 
            json_data[i]['name_product'], 
            json_data[i]['full_name'], 
            json_data[i]['unid_med'], 
            json_data[i]['user_register'], 
            json_data[i]['creation_date']
          ]).draw(false);
            
        }
      }
    }
  })

});

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
      var formu = document.getElementById('formdata');
      formu.id_type_p.className = 'form-control select2';
      formu.name_product.className = 'form-control form-control-border';
      formu.full_name.className = 'form-control form-control-border';
      formu.unit_price.className = 'form-control form-control-border';

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
    const SaveData=(a,formu)=>{
      if (a === true){
        $.ajax({
          type: 'post', 
          url: 'https://localhost:5001/api/productos',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          data: JSON.stringify({
            id_type_p:parseInt(formu.id_type_p.value),
            name_product:formu.name_product.value,
            full_name:formu.full_name.value,
            unit_price:parseFloat(formu.unit_price.value),
            user_register:formu.user_register.value,
          }),
          success: function (res){
            console.log(res)
            alert(res)
            window.location.href=('/Detalle/Productos')
            
          } 
        })

      //   axios({
      //     method: 'post',
      //     url: 'https://localhost:5001/api/productos',
      //     headers:{
      //       'Accept':'application/json',
      //       'Content-Type':'application/json'
      //     },
      //     data:JSON.stringify({
      //       id_type_p:parseInt(formu.id_type_p.value),
      //       name_product:formu.name_product.value,
      //       full_name:formu.full_name.value,
      //       unit_price:parseFloat(formu.unit_price.value),
      //       user_register:formu.user_register.value,
      //     })
      // })
      // .then(res => res.json())
      // .then((result)=>{
      //   console.log(result)
      // },
      // (error)=>{
      //   console.log(error)
      // })
      }
    }
          // 
          
          // Validations
    var classSuccess = 'form-control is-valid form-control-border';
    var classWarning = 'form-control form-control-border is-invalid';
    const form = ()=>{
        var formu = document.getElementById('formdata');
        var a,b,c,d,e = false;

        if(formu.id_type_p.value === ''){
          b = false
          formu.id_type_p.className = 'form-control select2 is-invalid'
        }else{
          b = true
          formu.id_type_p.className = 'form-control select2 is-valid'
        } if(formu.name_product.value === ''){
          c = false
          formu.name_product.className = classWarning;
        }else{
          c = true
          formu.name_product.className = classSuccess;
        }if(formu.full_name.value === ''){
          d = false
          formu.full_name.className = classWarning
        }else{
          d = true
          formu.full_name.className = classSuccess;
        }if(formu.unit_price.value === ''){
          e = false
          formu.unit_price.className = classWarning;
        }else{
          e = true
          formu.unit_price.className = classSuccess;
        }
        if (b===true && c===true && d===true && e===true){
          a = true;
        }
        SaveData(a,formu)
    }

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
                <div className="card shadow rounded">
                  <div className="card-header d-flex">
                    <h1 className="card-title">Tabla Prodcutos</h1>
                    <button type="button" class="btn btn-primary btn-sm ml-auto" data-toggle="modal" data-target="#modal-product"  onClick={selectData}>
                        Agregar Producto
                    </button>
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="example1" className="table order-column table-striped row-border hover order-column">
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
                          <select className='form-control select2 ' id='idselect' name='id_type_p' >
                          </select>
                      </div>
                      <div class="invalid-feedback">
                          Campo vacio.
                      </div>
                  </div> 
                  <div class="form-group col-md-5 mt-4 mr-4">
                    <label></label>
                      <input type="text" name="name_product"  className="form-control form-control-border" placeholder="Nombre Producto"/>
                      <div class="invalid-feedback">
                            Campo vacio.
                      </div>
                  </div>
                  <div class="form-group col-md-5 mt-2">
                    <input type="text" name="full_name" className="form-control form-control-border " placeholder="Nombre Completo"/>
                    <div class="invalid-feedback">
                        Campo vacio.
                    </div>
                  </div>
                  <div class="form-group col-md-3 mt-2">
                    <input type="text" name="unit_price" className="form-control form-control-border ml-2"  placeholder="Precio Unidad"/>
                    <div class="invalid-feedback">
                        Campo vacio.
                    </div>
                  </div>
                </div>
                    
                {/*  */}
                <div class="modal-footer  justify-content-between">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={remove_data}>Cancelar</button>
                  <button type="button" name="user_register" value={cookies.get('user')} className="btn btn-primary" onClick={form}>Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <br/><br/>
      </>
      
    )
  
  }