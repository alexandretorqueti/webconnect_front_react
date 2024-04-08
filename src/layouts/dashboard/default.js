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

import { useState } from 'react'

const Default = () => {
        const [pessoasComRelacao, setPessoasComRelacao] = useState([]);
        return (
            <>
            <Sidebar />
            <Header 
                pessoasComRelacao={pessoasComRelacao}
                setPessoasComRelacao={setPessoasComRelacao}
            />
            <div className="main-content">
                <Outlet/>
            </div>
            <RightSidebar 
                pessoasComRelacao={pessoasComRelacao}
                setPessoasComRelacao={setPessoasComRelacao}
            />
            <Footer />

            <SettingOffCanvas />
            </>
        )
}

export default Default


