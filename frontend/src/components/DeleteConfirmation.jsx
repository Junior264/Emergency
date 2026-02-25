import React from 'react';
import Input from './Input';
import Button from './Button';
import { cancel, lock, user } from '../assets/icons';
import { UseAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({toggle, action}) => {
    const {deleteUser} = UseAuth();
    const navigate = useNavigate();

    const handleSubmit = () => {
        deleteUser();
        navigate("/login");
    }

    return (
        <div className={`absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-500/90 z-100 flex justify-center items-center ${toggle ? '' : 'hidden'}`}>
            <div className='bg-white min-w-[50vw] min-h-[50vh] rounded-2xl'>
                <div className='flex justify-end p-1 pb-5'>
                    <button 
                        onClick={toggle}
                        className="group relative p-2.5 rounded-full transition-all duration-300 ease-out hover:bg-gray-100 active:scale-90 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 text-gray-500 transition-colors duration-300 group-hover:text-gray-900"
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span className="sr-only">Schließen</span>
                    </button>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='padding-x flex flex-col justify-center items-center gap-5'>
                        <p className="text-3xl text-center pt-4">Are you sure you want to delete your account forever?</p>
                    </div>
                    <div className='padding-x mt-10 flex flex-col gap-5'>
                        <Button label="Confirm" onClick={() => handleSubmit()} />
                        <Button label="Cancel" onClick={action} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
