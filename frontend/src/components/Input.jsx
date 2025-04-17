import React from 'react'

const Input = ({label, icon, placeholder, type, name, onChange}) => {

  return (
    <div className="flex flex-col border-b-2 border-gray-300 pb-2">
        <label className="font-montserrat text-slate-gray">{label}</label>
        <div className="mt-4 flex">
            <img src={icon} alt='icon' width={20} height={20} />
            <input  type={type} placeholder={placeholder} name={name} onChange={onChange} className="input text-slate-gray"/>
        </div>
    </div>
  )
}

export default Input
