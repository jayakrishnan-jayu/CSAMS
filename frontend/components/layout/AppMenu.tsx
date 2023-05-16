import React, { useContext } from "react";
import AppMenuitem from "./AppMenuItem";
import { MenuProvider } from "./context/menucontext";
import { MetaDataContext } from "./context/metadatacontext";

import { AppMenuItem } from '../../types/types';

const AppMenu = () => {
  
  const homeSection: AppMenuItem = {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
  };

  const accountSection: AppMenuItem = {
    label: "Account",
    items: [
      { label: "User Profile", icon: "pi pi-fw pi-user", to: "/profile" },
      { label: "Account Settings", icon: "pi pi-fw pi-lock", to: "/settings" },
    ],
  };
  const facultySection: AppMenuItem = {
    label: "Faculty",
    items: [
      {
        label: "Preference",
        icon: "pi pi-fw pi-star",
        to: "/faculty/preference",
      },
      { label: "Report", icon: "pi pi-fw pi-file", to: "/faculty/report" },
    ],
  };
  const adminSection: AppMenuItem = {
    label: "Management",
    items: [
      {
        label: "Faculties",
        icon: "pi pi-fw pi-id-card",
        to: "/management/faculties",
      },
      {
        label: "Allocation",
        icon: "pi pi-fw pi-book",
        to: "/management/allocation",
      },
      {
        label: "Curriculum",
        icon: "pi pi-fw pi-money-bill",
        items: [
          {
            label: "Upload",
            to: "/management/curriculum/upload",
          },
          {
            label: "Manage",
            to: "/management/curriculum/manage",
          },
        ],
      },
      {
        label: "Batch",
        icon: "pi pi-fw pi-book",
        items: [
          {
            label: "Manage",
            to: "/management/batch/manage",
          },
          {
            label: "Verify",
            to: "/management/batch/verify",
          
          },
        ],
      },
      {
        label: "Settings",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            label: "Workload",
            icon: "pi pi-fw pi-clock",
            to: "/management/settings/workload",
          },
          {
            label: "Config",
            icon: "pi pi-fw pi-info",
            to: "/management/settings/config",
          },
        ],
      },
    ]
  };

  const { metaData } = useContext(MetaDataContext);
  let model = [homeSection];
  if (metaData?.metadata?.user?.isStaff) {
    model = [homeSection, facultySection, adminSection, accountSection];
  } else if (metaData?.metadata?.faculty) {
    model = [homeSection, facultySection, accountSection];
  }
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item: any, i: number) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i.toString()} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
