/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import PrimeReact from 'primereact/api';
import { classNames } from 'primereact/utils';
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState} from 'react';
import { AppTopbarRef, LayoutConfig, LayoutState } from '../../types/types';
import { LayoutContext } from './context/layoutcontext';
import { InputSwitch } from 'primereact/inputswitch';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const {  layoutState,  onMenuToggle, showProfileSidebar , handleThemeChange ,layoutConfig ,setLayoutConfig ,setLayoutState} = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);


  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));


  const onThemeChange = () => {
      localStorage.setItem("dark_mode", JSON.stringify(!layoutState.darkMode))
      const _isDarkMode = localStorage.getItem("dark_mode")
      if(_isDarkMode == "true")
      {
          handleThemeChange(true)
      }
      else {
          handleThemeChange(false)
      }
  }



  return (

    <div className="layout-topbar">
      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button p-0 m-0"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>
      <Link href="/" className="layout-topbar-logo px-5">
        <>
          <img
            src="/AmritaLogo.jpeg"
            width="147.22px"
            height={"35px"}
            alt="logo"
          />
          {/* <span>Amrita</span> */}
        </>
      </Link>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <Link href="/profile">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </Link>
        <Link href="/settings">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>

        <button type="button" className="p-link layout-topbar-button" onClick={()=>onThemeChange()}>
          <i className={layoutState.darkMode ? "pi pi-moon" : "pi pi-sun"} ></i>
          <span>Settings</span>
        </button>

      </div>
    </div>
  );
});

export default AppTopbar;
