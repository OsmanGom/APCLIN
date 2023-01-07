import React , {useEffect} from 'react'
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const cookies = new Cookies();
$(document).ready(function () {
  var t1 = $("#tbld").DataTable({
    
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
    "responsive": true, "lengthChange": true, "autoWidth": true,
  })
  
  if(window.location.href === `${cookies.get('local')}dashboard`){
    $.ajax({
      type: "GET",
      url: `${cookies.get('server')}/api/stock/${cookies.get('enterprise')}`,
    
      success: function(json_data) {
        if (json_data !== 'Not Data'){
          
          for (let i = 0; i < json_data.length; i++) {
            t1.row.add([
              json_data[i]['cod_lot'],
              json_data[i]['cod_prod'], 
              json_data[i]['name_product'], 
              json_data[i]['detail_store'], 
              json_data[i]['total_quantity']
            ]).draw(false);
              
          }
        }}
    })

  
    $.ajax({
      type: "PUT",
      url: `https://localhost:5001/api/stock/${cookies.get('enterprise')}`,
     
      success: function(res) {
        if (res !== 'Not Data'){
          let verde = 0 , amarillo = 0, rojo = 0, total = 0
          for (let i = 0; i < res.length; i++) {
            
            if(res[i]['Semaforizacion'] === 'ROJO'){
              rojo += parseInt(res[i]['total_quantity'])
              
            }else if(res[i]['Semaforizacion'] === 'AMARILLO'){
              amarillo += parseInt(res[i]['total_quantity'])
              
            }else{
              verde += parseInt(res[i]['total_quantity'])
              
            }
          }
          total = (verde + amarillo + rojo)
          
          if(document.getElementById('total') !== null ){
  
            document.getElementById('total').innerHTML = total
            document.getElementById('verde').innerHTML = verde
            document.getElementById('amarillo').innerHTML = amarillo
            document.getElementById('rojo').innerHTML = rojo
          }
        }}
    })

  }
  
});


export default function Dashboard(props) {
  document.querySelector('title').textContent = 'Clinica | Principal';

  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/dashboard');
    }else{
      props.history.push('/');
    }
      },[]); 
    
    const Report_Stock = ()=>{
      console.log('reporte stock')
      // window.open(`http://atenea/ReportServer/Pages/ReportViewer.aspx?%2fUAC_REPORT%2fReporteDispositivos&rs:Command=Render&rs:embed=true&rc:Parameters=false&busqueda=${parametro}&pais=${parametro1}`);
    }
      
    return (
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          {/* <h1 className="m-0">{cookies.get('user')}</h1> */}
          <h1>Control de Inventario</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item active">Home</li>
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
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id='total'></h3>
              <p>Productos en inventario</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <a href="/Detalle/Productos" className="small-box-footer">Mas info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              <h3 id='verde'></h3>
              <p>Actuales</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href="/Semaforizacion/Verde" className="small-box-footer">Mas info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3 id='amarillo'></h3>
              <p>Proximos a Vencer</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="/Semaforizacion/Amarillo" className="small-box-footer">Mas info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3 id='rojo'></h3>
              <p>3 meses a vencimiento</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="/Semaforizacion/Rojo" className="small-box-footer">Mas info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      {/* /.row */}
      {/* Main row */}
      <div className="row">
        {/* Left col */}
        <section className="col-lg-12 connectedSortable">
          {/*  */}
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-12">
                <div className="card shadow rounded card-info card-outline">
                <div className="card-header ">
                    <h1 className="card-title">Stock</h1>
                    <button type="button" class="btn btn-info btn-sm ml-1  float-right" title='Generar Reporte' onClick={Report_Stock}>
                    <i class="fa fa-file"></i>&nbsp;&nbsp;&nbsp;Reporte 
                    </button>
                    {/* <button type="button" class="btn btn-success btn-sm ml-auto" onClick={htmlExcel}>
                      <i class="fa fa-file-export"></i>  Export
                    </button> */}
                  </div>
                  <div className="card-body table-responsive" id='data1'>
                    <table id="tbld" className="table  table-striped row-border hover order-column">
                      <thead>

                        <tr>
                          <th>Nombre de Lote</th>
                          <th>Codigo de Producto</th>
                          <th>Nombre de producto</th>
                          <th>Almacen</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Nombre de Lote</th>
                          <th>Codigo de Producto</th>
                          <th>Nombre de producto</th>
                          <th>Almacen</th>
                          <th>Stock</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>{/* /.col */}
                </div>
              </div>
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
          {/*  */}
        </section>
       
      </div>
      {/* /.row (main row) */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

    )
}
