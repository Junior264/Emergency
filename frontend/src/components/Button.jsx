const Button = ({label, iconURL, backgroundColor, textColor, borderColor, fullWidth, onClick, width}) => {
    return (
        <button
        type="button"
            onClick={onClick}
            className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full cursor-pointer
                ${backgroundColor ? `${backgroundColor} ${textColor}` : 'bg-rainy-mood text-white border-rainy-mood' }
                ${fullWidth && 'w-full'}
                ${width && `w-${width}`}`
            }
        >
            {label}
            {iconURL && <img src={iconURL} alt="button" className="ml-2 rounded-full w-5 h-5" />}
      </button>
    );
  };
  
  export default Button;
