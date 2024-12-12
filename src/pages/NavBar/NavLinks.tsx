
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./MyLinks";

interface SubLinkItem {
  name: string;
  link: string;
}

interface SubMenuLink {
  Head: string;
  sublink: SubLinkItem[];
}


interface LinkItem {  
  name: string;
  submenu?: boolean;
  sublinks: SubMenuLink[];
  link?: string;
}

const NavLinks: React.FC = () => {
  const [heading, setHeading] = useState<string>("");

  return (
    <div dir="rtl" className="flex text-xl font-anjoman">
      {links.map((link: LinkItem, index: number) => (
        <div
          key={index}
          className="relative group px-3"
          style={{ position: "relative", zIndex: 5 }} // Ensure parent has proper stacking context
        >
          <div className=" py-4 px-18 text-center md:cursor-pointer flex items-center">
            {link.submenu ? (
              <h1
                className="px-3 flex justify-between items-center md:pr-0 pr-5 text-black font-bold text-xl hover:text-[#f97316]"
                onClick={() => {
                  heading !== link.name
                    ? setHeading(link.name)
                    : setHeading("");
                }}
              >
                {link.name}
              </h1>
            ) : (
              <Link
                to={link.link || "#"}

                className="px-2 text-black font-bold text-xl hover:text-[#f97316]"

              >
                {link.name}
              </Link>
            )}
          </div>

          {link.submenu && (
            <div>
              {/* Desktop submenu */}
              <div

                className="absolute top-20 right-0 hidden group-hover:md:block hover:md:block"
                style={{ zIndex: 10 }} // Submenu z-index higher than .line
              >
                <div className="py-3">

                  <div
                    // className="w-5 h-4 right-3 absolute mt-1 bg-white rotate-45"
                    className="w-5 h-4 right-3 absolute mt-1 bg-gray-200 rotate-45"
                    style={{ zIndex: 11 }} // Arrow part of submenu above .line
                  ></div>
                </div>
                <div
                  className="bg-gray-200 p-4 grid grid-cols-4 gap-20 text-right text-black rounded shadow-xl"
                  style={{ zIndex: 12 }} // Main submenu
                >
                  {link.sublinks.map((mysublinks, subIndex) => (
                    <div key={subIndex} className="mb-5">
                      <h1 className="text-lg font-bold">{mysublinks.Head}</h1>
                      <ul className="mt-2">
                        {mysublinks.sublink.map((slink, slinkIndex) => (
                          <li
                            key={slinkIndex}
                            className="text-sm font-semibold text-gray-600 my-2 hover:text-primary whitespace-nowrap text-ellipsis hover:text-[#f97316]"
                          >
                            <Link to={slink.link}>{slink.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
