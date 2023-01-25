import React  from 'react'
import { BrowserRouter, Route, Switch  } from 'react-router-dom';


import Header from './components/common/header.jsx'
import Menu from './components/common/menu.jsx'
import Dashboard from './components/pages/dashboard.jsx'
import Login from './components/pages/login.jsx';
import Ficapacidades from './components/pages/Registro_Incapacidads';
import Incapacidades from './components/pages/Incapacidades'
import Produtos_D from './components/pages/Productos_detalle'
import Kardex from './components/pages/kardex'
import R_Base from './components/pages/Registros_Base.jsx'
import TrazaKardez from './components/pages/TranzaKardex'
import Semaforizacion_Rojo from './components/pages/Zemaforizacion_Rojo.jsx'
import Semaforizacion_Amarillo from './components/pages/Zemaforizacion_Amarillo.jsx'
import Semaforizacion_Verde from './components/pages/Zemaforizacion_Verde.jsx'
import BarCode from './components/pages/BarCode.jsx'



export default function App() {
  // const [login,setLogin] = useState(false)
  return (
     
    <BrowserRouter  >
    <Switch>
      <Route exact path="/" component={Login} />
      
        <div>
          <Header/>
          <Menu/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/Incapacidades" component={Ficapacidades}/>
          <Route exact path="/Detalle/Incapacidades" component={Incapacidades}/>
          <Route exact path="/Detalle/Productos" component={Produtos_D}/>
          <Route exact path="/kardex" component={Kardex}/>
          <Route exact path="/Registros/Base" component={R_Base}/>
          <Route exact path="/Kardex/Trazabilidad" component={TrazaKardez}/>
          <Route exact path="/Semaforizacion/Rojo" component={Semaforizacion_Rojo}/>
          <Route exact path="/Semaforizacion/Amarillo" component={Semaforizacion_Amarillo}/>
          <Route exact path="/Semaforizacion/Verde" component={Semaforizacion_Verde}/>
          <Route exact path="/barcode" component={BarCode}/>
        </div>
    </Switch>
    {/* <Footer/> */}
    </BrowserRouter>
    
  )
}

