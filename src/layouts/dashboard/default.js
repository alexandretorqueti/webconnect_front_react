import React, { useEffect, useState } from 'react'

//header
import Header from '../../components/partials/dashboard/HeaderStyle/header'

//sidebar
import RightSidebar from '../../components/partials/dashboard/SidebarStyle/rightsidebar'

//sidebar
import Sidebar from '../../components/partials/dashboard/SidebarStyle/sidebar'

//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'

//default 
// import DefaultRouter from '../../router/default-router'

// share-offcanvas
// import ShareOffcanvas from '../../components/share-offcanvas'

//settingoffCanvas
import SettingOffCanvas from '../../components/setting/SettingOffCanvas'
import { Outlet } from 'react-router-dom'

import { Pessoas } from '../../services/Pessoas'
const PessoasService = new Pessoas();

const Default = () => {
    const [pessoa_logada, setPessoaLogada] = useState();
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchPessoaLogada = async () => {
            const data = await PessoasService.getUsuarioLogado();
            setPessoaLogada(data);
        };

        // Call the async function
        fetchPessoaLogada();
    }, []); // Empty array means this effect runs once on mount

    if (pessoa_logada)
        return (
            <>
                <Sidebar pessoa_logada={pessoa_logada}/>
                <Header pessoa_logada={pessoa_logada}/>
                <div className="main-content">
                    {/* <div id="content-page" className="content-page"> */}
                    {/* <DefaultRouter/> */}
                    <Outlet/>
                    {/* </div> */}
                </div>
                <RightSidebar pessoa_logada={pessoa_logada}/>
                <Footer pessoa_logada={pessoa_logada}/>
                <SettingOffCanvas pessoa_logada={pessoa_logada}/>
            </>
        )
    else
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
}

export default Default


