import React from 'react';

const Input = ({ label, icon, placeholder, type, name, onChange, value }) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label 
                    htmlFor={name}
                    className="mb-2 ml-1 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none"
                >
                    {label}
                </label>
            )}
            
            <div className="relative flex items-center group">
                {icon && (
                    <div className="absolute left-5 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-all duration-300">
                        <img src={icon} alt="" className="w-5 h-5 group-focus-within:scale-110" />
                    </div>
                )}
                
                <input 
                    id={name}
                    name={name}
                    type={type} 
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} 
                    className={`
                        w-full font-montserrat text-gray-700 bg-gray-50/50 
                        border border-gray-200 rounded-2xl py-4 transition-all duration-300
                        placeholder:text-gray-300 outline-none
                        hover:bg-gray-50 hover:border-gray-300
                        focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/10
                        ${icon ? 'pl-14 pr-6' : 'px-6'}
                    `}
                />
            </div>
        </div>
    );
};

export default Input;