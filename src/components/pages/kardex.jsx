import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
// import "alertify.min.js"



$(document).ready(function () {
  var t = $('#example2').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
  },
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/kardex",
   
    success: function(json_data) {
      
      if (json_data !== 'Not Data'){
          
        for (let i = 0; i < json_data.length; i++) {
          t.row.add([
            json_data[i]['cod_correlative'], 
            json_data[i]['Cod_store'], 
            json_data[i]['deatil_store'], 
            json_data[i]['cod_prod'], 
            json_data[i]['product'], 
            json_data[i]['reference'], 
            json_data[i]['origin_product'],
            json_data[i]['quantity'], 
            json_data[i]['cod_employed'], 
            json_data[i]['description_typeP'], 
            json_data[i]['lot_number'], 
            json_data[i]['date_exp'], 
            json_data[i]['user_register'], 
            json_data[i]['date_create']
          ]).draw(false);
            
        }
      }
    }
  })

});

export default function Kardex(props) {
    document.querySelector('title').textContent = 'Clinica |  Kardex';
    
    const cookies = new Cookies();
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Kardex');
      }else{
        props.history.push('/');
      }
    },[]); 

    
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
                  <div className="card-header d-flex">
                    
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="example2" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Correlative</th>
                          <th>Codigo Tienda</th>
                          <th>Tienta</th>
                          <th>Codigo Empresa</th>
                          <th>Codigo Porducto</th>
                          <th>Producto</th>
                          <th>Referencia</th>
                          <th>Origen</th>
                          <th>Cantidad</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Expiracion</th>
                          <th>Usuario Registro</th>
                          <th>Fecha Creacion</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                        <th>Correlative</th>
                          <th>Codigo Tienda</th>
                          <th>Tienta</th>
                          <th>Codigo Empresa</th>
                          <th>Codigo Porducto</th>
                          <th>Producto</th>
                          <th>Referencia</th>
                          <th>Origen</th>
                          <th>Cantidad</th>
                          <th>Codigo Empleado</th>
                          <th>Fecha Expiracion</th>
                          <th>Usuario Registro</th>
                          <th>Fecha Creacion</th>
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