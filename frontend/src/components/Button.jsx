const Button = ({label, iconURL, backgroundColor, textColor, borderColor, fullWidth, onClick, width}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                flex justify-center items-center gap-3 px-7 py-4 
                font-montserrat text-lg font-bold leading-none cursor-pointer
                transition-all duration-200 active:scale-[0.98]
                shadow-sm hover:shadow-md
                ${fullWidth ? 'w-full' : ''}
                ${width ? `w-${width}` : ''}
                ${backgroundColor 
                    ? `${backgroundColor} ${textColor} ${borderColor ? `border ${borderColor}` : 'border-transparent'}` 
                    : 'bg-blue-600 text-white border-transparent hover:bg-blue-700 shadow-blue-100'
                }
                rounded-2xl
            `}
        >
            {label}
            {iconURL && (
                <img 
                    src={iconURL} 
                    alt="button icon" 
                    className="w-5 h-5 object-contain brightness-0 invert" 
                />
            )}
      </button>
    );
  };
  
  export default Button;
