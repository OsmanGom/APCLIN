import React from 'react'
import axios from 'axios'


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
        <div className="row mb-2">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Tabla Incapacitados</h1>
                    </div>
                    <div className="card-body">
                    <button id="addRow" className='btn btn-primary '>Add new row</button>
                    <table id="example" className="table table-bordered table-striped row-border hover order-column">
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                                <th>Column 4</th>
                                <th>Column 5</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                                <th>Column 4</th>
                                <th>Column 5</th>
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