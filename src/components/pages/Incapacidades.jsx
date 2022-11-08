import React from 'react'

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
                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                              
                            <tr>
                               
                                <th>Area</th>
                                <th>Fecha</th>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Identidad N.</th>
                                <th>Dias</th>
                                <th>Condicion</th>
                                <th>Diagnostico</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Trident</td>
                                <td>Internet
                                Explorer 4.0
                                </td>
                                <td>Win 95+</td>
                                <td> 4</td>
                                <td>X</td>
                                <td>2</td>
                                <td>grabe</td>
                                <td>Reposo</td>
                            </tr>
                            <tr>
                                <td>Trident</td>
                                <td>Internet
                                Explorer 5.0
                                </td>
                                <td>Win 95+</td>
                                <td>5</td>
                                <td>C</td>
                                <td>2</td>
                                <td>grabe</td>
                                <td>Reposo</td>
                            </tr>
                            <tr>
                                <td>Trident</td>
                                <td>Internet
                                Explorer 5.5
                                </td>
                                <td>Win 95+</td>
                                <td>5.5</td>
                                <td>A</td>
                                <td>2</td>
                                <td>grabe</td>
                                <td>Reposo</td>
                            </tr>

                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Area</th>
                                <th>Fecha</th>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Identidad N.</th>
                                <th>Dias</th>
                                <th>Condicion</th>
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