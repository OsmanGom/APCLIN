import React,{useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const cookies = new Cookies();

$(function (){
  if(document.getElementById('root').value){
  var t2 = $("#example").DataTable({
    "language": {
    "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
  },
    order: [[11,'desc']],
    "responsive": true, "lengthChange": true, "autoWidth": true,
  })
  
  $.ajax({
      type: "GET",
      url: `${cookies.get('server')}/api/incapacidades/${cookies.get('enterprise')}`,
    
      success: function(json_data) {
        if (json_data !== 'Not Data'){
          let condition,status
          for (let i = 0; i < json_data.length; i++) {
            if(json_data[i]['condition'] === ''){
              condition = 'Vacio'
            }else{condition = json_data[i]['condition']}

            if(json_data[i]['status_p'] === true){
              status = 'Permanente'
            }else{status = 'Temporal'}
            t2.row.add([
              json_data[i]['n_tranzability'], 
              json_data[i]['exp_codigo_alternativo'], 
              json_data[i]['exp_nombres_apellidos'], 
              json_data[i]['departamento'],
              json_data[i]['puesto'], 
              json_data[i]['days'], 
              condition, 
              status, 
              json_data[i]['time_p'], 
              json_data[i]['days_p'],
              json_data[i]['user_register'],
              json_data[i]['creation_date'], 
              json_data[i]['diagnostic'], //onclick=`+"{Reporte_Incapacidades(this.value)}"+`
              `<button class='btn btn-success  btn-md' value=`+json_data[i]['id']+` title='Reporte Firma'onclick=`+"{Reporte_Firma_persona(this.value,document.getElementById('root').value)}"+` ><i class="fa fa-file-export"></i></button>`,
              `<button class='btn btn-warning  btn-md' value=`+json_data[i]['id']+` title='Reporte Incapacidad' onclick=`+"{Reporte_Incapacidades_persona(this.value,document.getElementById('root').value)}"+`><i class="fa fa-file-export"></i></button>`
            ]).draw(false);
              
          }
          
        }
      }
    })
  }
});

export default function Incapacidades(props) {

  document.querySelector('title').textContent = 'Clinica | Detalle Incapacidad';
    
    useEffect(()=>{
      if(cookies.get('ID')){
        props.history.push('/Detalle/Incapacidades');
      }else{
        props.history.push('/');
      }
        },[]); 

        const Report_Incpacidades_Mensual=()=>{
          console.log('Entro Mensual')
        }
        const Report_Incpacidades_Diario=()=>{
          console.log('Entro diario')
        }
    
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
        <div className="row ">
            <div className="col-12">
                <div className="card shadow rounded">
                    <div className="card-header ">
                        <h1 className="card-title">Tabla Incapacitados</h1>
                        <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_Incpacidades_Mensual}>
                          <i class="fa fa-file"></i> Reporte Mensual
                        </button>
                        <button type="button" class="btn btn-warning btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_Incpacidades_Diario}>
                          <i class="fa fa-file"></i> Reporte Diario
                        </button>
                    
                    </div>
                    <div className="card-body table-responsive" id='data1'>
                      
                      <table id="example" className="table  table-striped row-border hover order-column ">
                          <thead>
                              <tr>
                                <th>Correlative</th>
                                <th>Codigo Empleado</th>
                                <th>Nombre Empleado</th>
                                <th>Departamento</th>
                                <th>Cargo</th>
                                <th>Dias de incapacidad</th>
                                <th>Condicion</th>
                                <th>Estado</th>
                                <th>Tiempo&nbsp;Permiso</th>
                                <th>Dias&nbsp;Permiso</th>
                                <th>Usuario Registro</th>
                                <th>Fecha de creacion</th>
                                <th>Diagnostico</th>
                                <th>Reporte Firma</th>
                                <th>Reporte Incapacidad</th>
                              </tr>
                          </thead>
                          <tbody>

                          </tbody>
                          <tfoot>
                              <tr>
                                <th>Correlative</th>
                                <th>Codigo de Empleado</th>
                                <th>Nombre</th>
                                <th>Departamento</th>
                                <th>Cargo</th>
                                <th>Dias de incapacidad</th>
                                <th>Condicion</th>
                                <th>Estado</th>
                                <th>Tiempo&nbsp;Permiso</th>
                                <th>Dias&nbsp;Permiso</th>
                                <th>Usuario Registro</th>
                                <th>Fecha de creacion</th>
                                <th>Diagnostico</th>
                                <th>Reporte Firma</th>
                                <th>Reporte Incapacidad</th>
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