import React, { useState } from 'react';
import { lock, user as userIcon } from '../assets/icons';
import Input from './Input';
import Button from './Button';
import PersonalImage from './Image';
import api from '../utils/index';


const UserDetails = ({ toggle, action, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageProcessed = (name, file) => {
        setFormData(prev => ({ ...prev, [name]: file }));
        console.log("Bild bereit für Backend:", file);
    };

    const handleSubmit = async () => {
        const data = new FormData();

        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('age', formData.age);

        if (formData.image) data.append('image', formData.image);

        try {
            const response = await api.put('/details/update', data);
            if (response.status === 200) {
                console.log("Update erfolgreich!");
                if (onUpdateSuccess) {
                    onUpdateSuccess(formData); 
                }
                action();
            }
        } catch (error) {
            console.error("Update fehlgeschlagen:", error.response?.data);
        }
    };

    return (
        <div className={`fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center ${toggle ? '' : 'hidden'}`}>
            <div className='bg-white min-w-[35vw] max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200'>
                
                <div className='flex justify-between items-center p-8 border-b border-gray-100'>
                    <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>
                        User Details
                    </h2>
                    
                    <button 
                        onClick={action}
                        className="group relative p-3 -mr-2 rounded-full transition-all duration-300 ease-out hover:bg-gray-100 active:scale-90 focus:outline-none"
                    >
                        <svg 
                            viewBox="0 0 24 24" 
                            className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-gray-900"
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

                <div className='p-10 flex flex-col gap-8'>
                    <div className='flex flex-col gap-6'>
                        <Input 
                            name="firstName" 
                            label="FIRSTNAME" 
                            placeholder="Max" 
                            type="text" 
                            onChange={handleChange}
                        />
                        <Input 
                            name="lastName" 
                            label="LASTNAME" 
                            placeholder="Mustermann" 
                            type="text" 
                            onChange={handleChange}
                        />
                        <Input 
                            name="age" 
                            label="AGE" 
                            placeholder="10"
                            type="number" 
                            onChange={handleChange}
                        />
                        <PersonalImage 
                            name="image"
                            label="PROFILE IMAGE"
                            type="file" 
                            accept="image/*" 
                            onImageProcessed={handleImageProcessed}
                        />
                    </div>

                    <div className='mt-4 flex flex-col gap-4'>
                        <Button label="Update Details" onClick={handleSubmit} />
                        <button 
                            onClick={action}
                            className='text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
