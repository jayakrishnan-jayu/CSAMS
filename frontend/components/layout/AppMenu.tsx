import React, { useContext } from 'react';
import AppMenuitem from './AppMenuItem';
import { MenuProvider } from './context/menucontext';
import { MetaDataContext } from './context/metadatacontext';

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
    const facultySection = {
      label: 'Faculty',
      items: [
        { label: 'Prefernece', icon: 'pi pi-fw pi-star', to: '/faculty/preference' },
        { label: 'Report', icon: 'pi pi-fw pi-file', to: '/faculty/report' },
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
                    {
                        label: 'Manage',
                        to: '/management/curriculum/manage'
                    },
                ]
            },
            { 
                label: 'Batch', 
                icon: 'pi pi-fw pi-book', 
                items: [
                    {
                        label: 'Manage',
                        to: '/management/batch/manage'
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
                    {
                        label: 'Config',
                        icon: 'pi pi-fw pi-info',
                        to: '/management/settings/config'
                    },
                ]
            },
        ]
    };

    

    const { metaData } = useContext(MetaDataContext);
    let model = [homeSection];
    if (metaData?.metadata?.user?.isStaff) {
        model = [homeSection, facultySection, adminSection, accountSection]
    } else if (metaData?.metadata?.faculty) {
        model = [homeSection, facultySection, accountSection]
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