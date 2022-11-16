import React from 'react'
// import axios from 'axios'
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


$(function (){
  var t2 = $("#example").DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
  },
    "responsive": true, "lengthChange": true, "autoWidth": true,
  })
  $.ajax({
      type: "GET",
      url: "https://localhost:5001/api/incapacidades",
    
      success: function(json_data) {
        if (json_data !== 'Not Data'){

          for (let i = 0; i < json_data.length; i++) {
            t2.row.add([
              json_data[i]['id'], 
              json_data[i]['cod_employed'], 
              json_data[i]['days'], 
              json_data[i]['condition'], 
              json_data[i]['user_register'],
              json_data[i]['creation_date'], 
              json_data[i]['diagnostic'], 
            ]).draw(false);
              
          }

        }
      }
    })
});


export default function Incapacidades() {
    return (
<div className="content-wrapper">
  
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Detalle Incapacidades</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item active">Detalle Incapacidades</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>

    {/*Sections of tables  */}
  <section className="content">
    <div className="container-fluid">
        <div className="row mb-2 ">
            <div className="col-12">
                <div className="card shadow rounded">
                    <div className="card-header ">
                        <h1 className="card-title">Tabla Incapacitados</h1>
                    </div>
                    <div className="card-body table-responsive">
                      
                      <table id="example" className="table order-column table-striped row-border hover order-column">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Codigo de Empleado</th>
                                  <th>Dias de incapacidad</th>
                                  <th>Condicion</th>
                                  <th>Usuario Registro</th>
                                  <th>Fecha de creacion</th>
                                  <th>Diagnostico</th>
                              </tr>
                          </thead>
                          <tbody>

                          </tbody>
                          <tfoot>
                              <tr>
                                <th>ID</th>
                                <th>Codigo de Empleado</th>
                                <th>Dias de incapacidad</th>
                                <th>Condicion</th>
                                <th>Usuario Registro</th>
                                <th>Fecha de creacion</th>
                                <th>Diagnostico</th>
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


  )
  
  }