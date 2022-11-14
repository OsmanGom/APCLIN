import React  from 'react'
import { BrowserRouter, Route, Switch  } from 'react-router-dom';



import Footer from './components/common/footer.jsx'
import Header from './components/common/header.jsx'
import Menu from './components/common/menu.jsx'
import Dashboard from './components/pages/dashboard.jsx'
import Login from './components/pages/login.jsx';
import Ficapacidades from './components/pages/Registro_Incapacidads';
import Incapacidades from './components/pages/Incapacidades'
import Produtos_D from './components/pages/Productos_detalle'


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
        </div>
    </Switch>
    <Footer/>
    </BrowserRouter>
  )
}
