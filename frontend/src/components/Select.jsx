import React from 'react';

const Select = ({ label, options, onChange, defaultValue }) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="mb-2 ml-1 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none">
                    {label}
                </label>
            )}
            <div className="relative group">
                <select 
                    value={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full font-montserrat text-gray-700 bg-gray-50/50 border border-gray-200 rounded-2xl py-4 px-6 appearance-none outline-none transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/10 cursor-pointer"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-gray-700">
                            {opt.text}
                        </option>
                    ))}
                </select>
                
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-focus-within:opacity-100 group-focus-within:text-blue-500 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Select;