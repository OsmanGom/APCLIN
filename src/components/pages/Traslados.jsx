import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast"
const cookies = new Cookies();

document.querySelector('title').textContent = 'Clinica | Traslados Kardex';

export default function Traslados() {
    let btns = document.getElementById('btns')

    const selectStorDes = () => {
        let st = document.getElementById('select_alDes')
        if (st != null) {
            let options = document.querySelectorAll('#select_alDes option');
            options.forEach(o => o.remove());
            $.ajax({
                type: "GET",
                url: `${cookies.get('server')}/api/almacen/${cookies.get('enterprise')}`,
                success: function (json_data) {
                    const po = document.createElement('option')
                    po.value = ''
                    po.text = '------ Seleccioneeeee -------'
                    st.appendChild(po)
                    for (let i = 0; i < json_data.length; i++) {
                        const option = document.createElement('option')
                        option.value = json_data[i]['detail_store']
                        option.text = json_data[i]['detail_store'] + ' ' + json_data[i]['cia_abreviatura'] + '-' + json_data[i]['cia_descripcion']
                        st.appendChild(option);
                    }
                }
            })
        }
    }

    
    // var lst = document.getElementById('id_select_prostTras')
    // const selectstockTras=()=>{
    //   if (lst != null){
    //     $.ajax({
    //       type: "GET", 
    //       url:`${cookies.get('server')}/api/stock/7`,
    //       success:function(json_data) {  
    //         const po = document.createElement('option') 
    //         if (json_data !== 'Not Data'){

    //           po.value = ''
    //           po.text = '------ Seleccione -------'
    //           lst.appendChild(po)
    //           for (let i = 0; i < json_data.length; i++) {
    //             const option = document.createElement('option')
    //             option.value = json_data[i]['id']
    //             option.text = json_data[i]['detail_store']+' || Lote-'+json_data[i]['cod_lot']+' | '+ json_data[i]['cod_prod']+' | '+json_data[i]['name_product']+' | Existencia '+json_data[i]['total_quantity']
    //             option.title = json_data[i]['cod_lot']
    //             option.name = json_data[i]['cod_prod']
    //             option.placeholder = json_data[i]['detail_store']
    //             option.role = json_data[i]['total_quantity']
    //             lst.appendChild(option);
    //           }
              
    //         }else{
    //             po.value = ''
    //             po.text = 'No existen registros'
    //             lst.appendChild(po);
    //         }
    //       }
    //     })
    //   }
    // }


    const selectstockTras=()=>{
        let lst = document.getElementById('id_select_prostTras')
        if (lst != null){
            let options = document.querySelectorAll('#id_select_prostTras option');
            options.forEach(o => o.remove());
          $.ajax({
            type: "GET", 
            url:`${cookies.get('server')}/api/stock/${cookies.get('enterprise')}`,
            success:function(json_data) {  
              
                const po = document.createElement('option') 
                if (json_data !== 'Not Data'){
                    po.value = ''
                    po.text = '------ Seleccione -------'
                    lst.appendChild(po)

                    for (let i = 0; i < json_data.length; i++) {
                        const option = document.createElement('option')
                        option.value = json_data[i]['id']
                        option.text = json_data[i]['detail_store']+' || Lote-'+json_data[i]['cod_lot']+' | '+ json_data[i]['cod_prod']+' | '+json_data[i]['name_product']+' | Existencia '+json_data[i]['total_quantity']
                        option.title = json_data[i]['cod_lot']
                        option.name = json_data[i]['cod_prod']
                        option.placeholder = json_data[i]['detail_store']
                        option.role = json_data[i]['total_quantity']
                        lst.appendChild(option);
                    }

                }else{
                    po.value = ''
                    po.text = 'No existen registros'
              }
            }
          })
        }
    }


    // Funcion Tabla traslados
    // const add_tablaSTras=()=>{
        
    //     var formuk2 = document.getElementById('formk2');
        
    //     if(parseInt(formuk2.quantity.value) > parseInt(formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].role)){
    //         toast.error('Cantidad exede a la existente',{duration: 6000, position:"top-right"})
    //     }else if(typeof parseInt(formuk2.quantity.value) !== 'number'){
    //         toast.error('Cantidad debe ser un numero!!',{duration: 6000, position:"top-right"})
    //     }else{
    //         if (formuk2.cod_prods.value !== ''  && formuk2.quantity.value !== '' ){
               
            
    //             var fila = "<tr><td>"+formuk2.cod_prods.value+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].name+"</td><td className='celdas'>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].placeholder+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].title+"</td><td>"+formuk2.quantity.value+"</td><td><button class='btn btn-danger  btn-sm' value='eliminar' title='Eliminar dato' onClick={this.closest('tr').remove()} type='button'><i class='fas fa-trash'></i></button></td></tr>"
    //             var btn = document.createElement("TR");
    //             btn.innerHTML=fila;
    //             document.getElementById("id_creacions").appendChild(btn);
                
               
    //             selectstockTras()
    //             formuk2.quantity.value = ''
    //             formuk2.cod_employed.value = ''
    //             //selectEmployed()

    //         }else{
    //             toast.error('Campos vacios',{duration: 6000, position:"top-right"})
    //         }
    //     }
    // }

    const add_tablaSTras=()=>{
        
        var formuk2 = document.getElementById('formk2');
        
        if(parseInt(formuk2.quantity.value) > parseInt(formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].role)){
            toast.error('Cantidad exede a la existente',{duration: 6000, position:"top-right"})
        }else if(typeof parseInt(formuk2.quantity.value) !== 'number'){
            toast.error('Cantidad debe ser un numero!!',{duration: 6000, position:"top-right"})
        }else{
            if (formuk2.cod_prods.value !== ''  && formuk2.quantity.value !== '' ){
               
            
                var fila = "<tr><td>"+formuk2.cod_prods.value+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].name+"</td><td className='celdas'>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].placeholder+"</td><td>"+formuk2.cod_prods.options[formuk2.cod_prods.selectedIndex].title+"</td><td>"+formuk2.quantity.value+"</td><td><button class='btn btn-danger  btn-sm' value='eliminar' title='Eliminar dato' onClick={this.closest('tr').remove()} type='button'><i class='fas fa-trash'></i></button></td></tr>"
                var btn = document.createElement("TR");
                btn.innerHTML=fila;
                document.getElementById("id_creacions").appendChild(btn);
                
                //selectProds()
                selectStorDes()
                selectstockTras()
                formuk2.quantity.value = ''
                formuk2.cod_employed.value = ''
                //selectEmployed()

            }else{
                toast.error('Campos vacios',{duration: 6000, position:"top-right"})
            }
        }
    }




    const [traslados, setTraslados] = React.useState([]);
    // 
    return (
        <div className="content-wrapper ">
            {/* Content Header (Page header) */}
            <div>
                <Toaster
                    toastOptions={{
                        success: {
                            style: {
                                border: '1px solid #738877',
                                padding: '18px',
                                width: '300px',
                                color: '#f9f5f2',
                                background: '#08a225b8',
                            },
                        },
                        error: {
                            style: {
                                border: '1px solid #713200',
                                padding: '16px',
                                color: '#713200',
                                width: '250px',
                            },
                        },
                    }}
                />
            </div>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            {/* <h1 className="m-0">{cookies.get('user')}</h1> */}
                            <h1>Traslados Kardex</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {cookies.get('MenuPrincipal') === 'MenuPrincipal' &&
                                    <li className="breadcrumb-item "><a href="#" >Inicio</a></li>
                                }
                                <li className="breadcrumb-item active"><a href >Kardex</a></li>
                                <li className="breadcrumb-item active">Traslados</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}

            <div class=" col-md-11 ml-3  ">
                <div class="card  card-danger card-outline rounded shadow-lg">
                    <div class="card card-Navy card-tabs ">
                        <div class="card-header p-0 pt-1 ">
                            <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                {/* <li class="nav-item">
                                 <a class="nav-link active disabled" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="false">Header</a>
                             </li> */}
                                <li class="nav-item">
                                    <a class="nav-link disabled" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="true">Detail</a>
                                </li>

                            </ul>
                        </div>
                        <div class="card-body">
                            <form id='formdetalle'>
                                <div className="row">
                                    <div class="form-group col-md-5" id="id_bodega">
                                        <label ><span className="fas fa-store mr-2" />Codigo Bodega Origen</label>
                                        <select class="js-data-example" name="cod_store" id="select_al" >
                                        </select>
                                    </div>

                                    <div class="form-group col-md-5" id="id_bodega">
                                        <label ><span className="fas fa-store mr-2" />Codigo Bodega Destino</label>
                                        <select class="js-data-example" name="cod_store" id="select_alDes" >
                                        </select>
                                    </div>

                                </div>
                                <div class='row'>
                                    <div class="form-group col-md-6" id='pro_salidas'>
                                        <label>Producto</label>
                                        <select class="js-data-example" name="cod_prod" id="id_select_prostTras">
                                        </select>
                                        <div class="invalid-feedback">
                                            Campo vacio.
                                        </div>
                                    </div>

                                    <div class="form-group col-md-2">
                                        <br />
                                        <input type="number" name="quantity" class="form-control form-control-border " placeholder="Cantidad" />
                                        <div class="invalid-feedback">
                                            Campo vacio.
                                        </div>
                                    </div>

                                </div>

                                <div class="col-md-12">
                                    <button type="button" className="btn btn-info float-right mb-2" onClick={add_tablaSTras} id="btns" >
                                        <i class="fas fa-plus-circle" >&nbsp; Agregar</i>
                                    </button>
                                </div>
174, 

                                <div class="table-responsive ">
                                    <table class="table table-hover" id="tablita">
                                        <thead>
                                            <tr>

                                                <th>Producto </th>
                                                <th>Origen</th>
                                                <th>Destino</th>
                                                <th >Lote</th>
                                                <th >Cantidad</th>
                                                <th >Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="id_creacion">
                                        </tbody>
                                    </table>
                                    <table class="table table-hover" id="tablitas">
                                        <thead>
                                            <tr>

                                                <th>Producto </th>
                                                <th>Origen</th>
                                                <th>Destino</th>
                                                <th >Lote</th>
                                                <th >Cantidad</th>
                                                <th >Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="id_creacions">
                                        </tbody>
                                    </table>
                                </div>


                            </form>
                            <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-primary float-end" >Guardar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        // 
    )
}