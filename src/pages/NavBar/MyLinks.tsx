
interface Sublink {
  name: string;
  link: string;
}

interface Submenu {
  Head: string;
  sublink: Sublink[];
}

interface Link {
  name: string;
  submenu: boolean;
  sublinks: Submenu[];
  link?: string;
}

export const links: Link[] = [
  {
    name: " صفحه اصلی",
    submenu: false,
    link: "/",
    sublinks: [
      
    ],
  },
  {
    name: " ایونت",
    submenu: true,
    sublinks: [
      {
        Head: "ایونت",
        sublink: [
          { name: "ایونت1", link: "/" },
          { name: "ایونت2", link: "/" },
          { name: "ایونت3", link: "/" },
          { name: "ایونت4", link: "/" },
          { name: "ایونت5", link: "/" },
        ],
      },
      {
        Head: "رویداد",
        sublink: [
          { name: "رویدادهای من", link: "/" },
          { name: "ایجاد رویداد جدید", link: "/" },
          
        ],
      },
    ],
  },
  {
    name: "نشریه",
    submenu: false,
    link: "/magazine", 
    sublinks: [
    
    ],
  },
  {
    name: "پادکست",
    submenu: false,
    link: "/news",
    sublinks: [
    ],
  },
  {
    name: "اخبار",
    submenu: false,
    sublinks: [
    ],
  },
  
  {
    name: "گالری",
    submenu: false,
    sublinks: [
    ],
  },
  
  
 
];
