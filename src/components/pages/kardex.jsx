import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "alertify.min.js"

const cookies = new Cookies();


$(document).ready(function () {
  if(document.getElementById('root').value){

  var t = $('#example2').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
  },order: [[15,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  }); 
  $.ajax({
    type: "GET",
    url: `${cookies.get('server')}/api/kardex/${cookies.get('enterprise')}`,
   
    success: function(json_data) {
      
      if (json_data !== 'Not Data'){
          
        for (let i = 0; i < json_data.length; i++) {
          let bool, emp

          if (json_data[i]['origin_product'] === true){
            bool = 'Empresa'
          }else{bool = 'Seguro Social'}

          if (json_data[i]['cod_employed'] === '' || json_data[i]['cod_employed'] === null){
            emp = 'Vacio'
          }else{emp = json_data[i]['cod_employed']}
          
          t.row.add([
            json_data[i]['detail'],
            json_data[i]['option_move'], 
            json_data[i]['n_trazability'],
            bool,
            json_data[i]['cod_prod'],
            json_data[i]['name_product'],  
            json_data[i]['cod_lot'], 
            json_data[i]['detail_store'], 
            json_data[i]['quantity'], 
            json_data[i]['cia_descripcion'],  
            json_data[i]['reference'], 
            json_data[i]['date_exp'], 
            json_data[i]['user_register'], 
            emp, 
            json_data[i]['date_tranzaction'],
            json_data[i]['date_create'] 
          ]).draw(false);
            
        }
      }
    }
  })
  }
});

export default function Kardex(props) {
    document.querySelector('title').textContent = 'Clinica |  Kardex';
    
    
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardex');
      }else{
        props.history.push('/');
      }
    },[]); 

    const Report_Entradas=()=>{
      console.log('Entradas')
    }
    
    const Report_Salidas=()=>{
      console.log('Salidas')
    }
    return (
      
      <><div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Control de Inventario</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                  <li className="breadcrumb-item active">Detalle KARDEX</li>
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
                  <div className="card-header ">
                  <h1 className="card-title">Trazabilidad Movimientos</h1>
                  <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_Salidas}>
                    <i class="fa fa-file"></i> Salidas
                  </button>
                  <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_Entradas}>
                    <i class="fa fa-file"></i> Entradas
                  </button>
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="example2" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Tipo Movimiento</th>
                          <th>Opcion</th>
                          <th>Nº Transacción</th>
                          <th>Origen</th>
                          <th>Cod Producto</th>
                          <th>Producto</th>
                          <th>Lote</th>
                          <th>Almacén</th>
                          <th>Cantidad</th>
                          <th>Empresa</th>
                          <th>Referencia</th>
                          <th>Fecha de expiración</th>
                          <th>Usuario Registro</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Transacción</th>
                          <th>Fecha Creación</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Tipo Movimiento</th>
                          <th>Opcion</th>
                          <th>Nº Transacción</th>
                          <th>Origen</th>
                          <th>Cod Producto</th>
                          <th>Producto</th>
                          <th>Lote</th>
                          <th>Almacén</th>
                          <th>Cantidad</th>
                          <th>Empresa</th>
                          <th>Referencia</th>
                          <th>Fecha de expiración</th>
                          <th>Usuario Registro</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Transacción</th>
                          <th>Fecha Creación</th>
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
      
      {/*  */}
      </>

    )
  
  }