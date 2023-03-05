import React, { useState } from 'react';

interface MenuContextValue {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
  }

export const MenuContext = React.createContext<MenuContextValue>({
    activeMenu: '',
    setActiveMenu: () => {},
});

export const MenuProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};