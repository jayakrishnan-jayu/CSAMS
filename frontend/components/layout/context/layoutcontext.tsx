import React, {useState, createContext, useEffect} from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '../../../types/types';
import PrimeReact from "primereact/api";
export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });


    const darkmode = localStorage.getItem("dark_mode") || "false"
    let darkModevalue ;

     if(darkmode == "true"){

         darkModevalue = true
     }
     else {

         darkModevalue = false ;
      }

    useEffect(()=>{
        handleThemeChange(darkModevalue)
    },[])

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        // configSidebarVisible: false,
        darkMode: darkModevalue,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });



    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const handleThemeChange = (isDark:boolean)=>{
        if(isDark){

            PrimeReact.changeTheme?.(layoutConfig.theme, 'bootstrap4-dark-blue', 'theme-css', () => {
                setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme:'bootstrap4-dark-blue', colorScheme:'dark' }));
            });
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState,  darkMode:true  }));
        }
        else {
            PrimeReact.changeTheme?.(layoutConfig.theme, 'lara-light-indigo', 'theme-css', () => {
                setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme: 'lara-light-indigo', colorScheme:'light'  }));
            });
            setLayoutState((prevState: LayoutState) => ({ ...prevState, darkMode: false }));
        }

    }



    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        handleThemeChange,
        showProfileSidebar
    };



    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
