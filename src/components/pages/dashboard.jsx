import React , {useEffect} from 'react'
import Cookies from 'universal-cookie';

export default function Dashboard(props) {
  document.querySelector('title').textContent = 'Clinica | Principal';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  
  useEffect(()=>{
    if(cookies.get('ID')){
      props.history.push('/dashboard');
    }else{
      props.history.push('/');
    }
      },[]); 
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
              <h3>150</h3>
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
              <h3>53</h3>
              <p>Actuales</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>44</h3>
              <p>Proximos a Vencer</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>65</h3>
              <p>3 meses a vencimiento</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      {/* /.row */}
      {/* Main row */}
      <div className="row">
        {/* Left col */}
        <section className="col-lg-7 connectedSortable">
          
        </section>
       
      </div>
      {/* /.row (main row) */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

    )
}
