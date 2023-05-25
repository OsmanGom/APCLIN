import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


const cookies = new Cookies();

$(document).ready(function () {
  var t = $('#semafo3').DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    
  },
  order: [[1,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
    
  });
  if(window.location.href === `${cookies.get('local')}Semaforizacion/Verde`){
    $.ajax({
      type: "PATCH",
      url: `${cookies.get('server')}/api/stock/${cookies.get('enterprise')}`,
    
      success: function(json_data) {
        if (json_data !== 'Not Data'){
        
          for (let i = 0; i < json_data.length; i++) {
            t.row.add([
              json_data[i]['cod_prod'], 
              json_data[i]['full_name'], 
              json_data[i]['cod_lot'], 
              json_data[i]['total_quantity'],
              json_data[i]['unid_med'],
              json_data[i]['date_exp'], 
              json_data[i]['Semaforizacion'], 
              json_data[i]['detail_store']
            ]).draw(false);
              
          }
        }
      }
    })
  }
});

export default function Semaforizacion_Verde(props) {
    document.querySelector('title').textContent = 'Clinica | Zemaforizacion';
    
  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/Semaforizacion/Verde');
    }else{
      props.history.push('/');
    }
  },[props.history]); 

  const reloadD = () =>{
    window.location.href = '#/dashboard'
    window.location.reload();
   }
    // 
   const Report_SVERDE=()=>{
      // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&id_enterprise=${cookies.get('enterprise')}`,'_blank');
      window.open(`http://sjysrv02/ReportServer/Pages/ReportViewer.aspx?%2fAPCLIN_REPORT%2fReporteSemaforizaciónVerde&rs:Command=Render&rs:embed=true&rc:Parameters=false&id_enterprise=${cookies.get('enterprise')}`,'_blank');
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
                  <li className="breadcrumb-item"> <a href='#' onClick={reloadD}>Inicio</a></li>
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
                <div className="card shadow rounded card-success card-outline">
                  <div className="card-header">
                    <h1 className="card-title float-left">Productos a Expirar</h1>
                    <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_SVERDE}>
                    <i class="fa fa-file"></i>&nbsp;Reporte 
                    </button>
                    
                    
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="semafo3" className="table order-column table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Cód. Producto</th>
                          <th>Producto</th>
                          <th>Nombre&nbsp;Lote</th>
                          <th>Existencia</th>
                          <th>U/Medida</th>
                          <th>Fecha&nbsp;Exp</th>                                        
                          <th>Alerta</th>
                          <th>Almacen</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Cód. Producto</th>
                          <th>Producto</th>
                          <th>Nombre&nbsp;Lote</th>
                          <th>Existencia</th>
                          <th>U/Medida</th>
                          <th>Fecha&nbsp;Exp</th>                                        
                          <th>Alerta</th>
                          <th>Almacen</th>
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
      <br />

      {/*  */}
      

      </>
      
    )
  
  }