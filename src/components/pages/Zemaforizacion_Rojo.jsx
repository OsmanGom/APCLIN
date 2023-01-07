import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import toast, { Toaster } from "react-hot-toast"

const cookies = new Cookies();

$(document).ready(function () {
  var t = $('#semafo1').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    
  },
//   order: [[5,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
  $.ajax({
    type: "DELETE",
    url: `${cookies.get('server')}/api/stock/${cookies.get('enterprise')}`,
   
    success: function(json_data) {
      if (json_data !== 'Not Data'){
      
        for (let i = 0; i < json_data.length; i++) {
          t.row.add([
            json_data[i]['detail_store'],
            json_data[i]['date_exp'], 
            json_data[i]['cod_lot'], 
            json_data[i]['cod_prod'], 
            json_data[i]['name_product'], 
            json_data[i]['Semaforizacion'], 
            json_data[i]['total_quantity']
          ]).draw(false);
            
        }
      }
    }
  })

});

export default function Semaforizacion_Rojo(props) {
    document.querySelector('title').textContent = 'Clinica | Zemaforizacion';
    
    
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Semaforizacion/Rojo');
      }else{
        props.history.push('/');
      }
    },[]); 


    // 
   const Report_SRojo=()=>{
      console.log('entro')
      // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&busqueda=${parametro}&pais=${parametro1}`);
    }

    return (
      
      <><div className="content-wrapper mb-3">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Detalle Semaforizacion</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                  <li className="breadcrumb-item active">Detalle Semaforizacion</li>
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
                <div className="card shadow rounded  card-danger card-outline">
                  <div className="card-header ">
                    <h1 className="card-title float-left">Productos a Expirar</h1>
                    <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_SRojo}>
                    <i class="fa fa-file"></i> &nbsp;Reporte 
                    </button>
                    
                    
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="semafo1" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Almacen</th>
                          <th>Fecha&nbsp;Expiracion</th>
                          <th>Nombre&nbsp;Lote</th>
                          <th>Codigo&nbsp;Producto</th>
                          <th>Producto</th>
                          <th>Alerta</th>
                          <th>Existencia</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Almacen</th>
                          <th>Fecha&nbsp;Expiracion</th>
                          <th>Nombre&nbsp;Lote</th>
                          <th>Codigo&nbsp;Producto</th>
                          <th>Producto</th>
                          <th>Alerta</th>
                          <th>Existencia</th>
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
      </>
      
    )
  
  }