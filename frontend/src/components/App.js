import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, types } from 'react-alert';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import StoreContextProvider from '../STATES/Actions/Actions';
import Alerts from './Alerts';
import Routes from './Routes';
import Loading from "./Loading";
import Header from './header/Header';
import '../css/main.css';
import Footer from './footer/Footer';
import BackToTop from './BackToTop';


const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
    type: types.INFO,
}

const App = () => {
    return (
        <StoreContextProvider>
            <AlertProvider template={AlertTemplate} {...options}>
                <HashRouter>
                    <Header />
                    <BackToTop />
                    <Loading />
                    <Routes />
                    <Footer date={2020} />
                    <Alerts />
                </HashRouter>
            </AlertProvider>
        </StoreContextProvider>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'))

//export default App;
