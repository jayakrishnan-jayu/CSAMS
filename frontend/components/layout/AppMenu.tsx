import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuItem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { FacultyContext } from './context/facultycontext';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const homeSection = {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    }
    const accountSection = {
        label: 'Account',
        items: [
            { label: 'User Profile', icon: 'pi pi-fw pi-user', to: '/profile' },
            { label: 'Account Settings', icon: 'pi pi-fw pi-lock', to: '/settings' },
        ]
    }
    const adminSection = {
        label: 'Management',
        items: [
            { label: 'Faculties', icon: 'pi pi-fw pi-id-card', to: '/management/faculties' },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Workload',
                        icon: 'pi pi-fw pi-clock',
                        to: '/management/settings/workload'
                    },
                ]
            },
        ]
    }

    

    const { facultyData } = useContext(FacultyContext);
    let model = [homeSection];
    if (facultyData?.faculty?.user?.isStaff) {
        model = [homeSection, adminSection, accountSection]
    } else if (facultyData?.faculty) {
        model = [homeSection, accountSection]
    }
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
