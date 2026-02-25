import React, { useState } from 'react';

const DropDown = () => {
const [open, setOpen] = useState(false);

const handleOpen = () => {
    setOpen(!open);
}

return (
    <div className="flex flex-col border-b-2 border-gray-300 pb-2">
      <p className="font-montserrat text-slate-gray" onClick={handleOpen}>Dropdown</p>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button>Menu 1</button>
          </li>
          <li className="menu-item">
            <button>Menu 2</button>
          </li>
        </ul>
      ) : null}
    </div>
    )
}

export default DropDown;
