import React, { useContext } from 'react';
import AppMenuitem from './AppMenuItem';
import { MenuProvider } from './context/menucontext';
import { FacultyContext } from './context/facultycontext';

const AppMenu = () => {
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
                label: 'Curriculum', 
                icon: 'pi pi-fw pi-money-bill', 
                items: [
                    {
                        label: 'Upload',
                        to: '/management/curriculum/upload'
                    },
                ]
            },
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
