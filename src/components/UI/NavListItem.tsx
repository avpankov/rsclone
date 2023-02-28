import React from "react";

interface INavListItem {
  icon: React.SVGProps<SVGSVGElement>;
  name: string;
}

function NavListItem({ icon, name }: INavListItem) {
  return (
    <>
      {icon}
      {name}
    </>
  );
}

export default NavListItem;
