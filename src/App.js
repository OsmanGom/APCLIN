import React , { useState } from 'react'
import { BrowserRouter, Route, Switch  } from 'react-router-dom';



import Footer from './components/common/footer.jsx'
import Header from './components/common/header.jsx'
import Menu from './components/common/menu.jsx'
import Dashboard from './components/pages/dashboard.jsx'
import Login from './components/pages/login.jsx';
import Ficapacidades from './components/pages/Registro_Incapacidads.jsx';
import Incapacidades from './components/pages/Incapacidades'

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
        </div>
    </Switch>
  
    <Footer/>
    </BrowserRouter>
  )
}
