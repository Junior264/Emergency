import React, { useState } from 'react';
import { cancel } from '../assets/icons';
import { defaultUserImage } from '../assets/images';
import Button from './Button';
import UserDetails from './UserDetails';
import NotificationSettings from './NotificationSettings';
import DeleteConfirmation from './DeleteConfirmation';
import { UseAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggle }) => {
    const [userDailsVisible, setUserDailsVisible] = useState(false);
    const [notificationSettingsVisible, setNotificationSettingsVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const { logout } = UseAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <div 
                id="sidebar" 
                className='bg-white flex flex-col min-w-[35%] h-screen shadow-2xl border-l border-gray-100 transition-all overflow-hidden'
            >
                <div className='flex justify-end p-6'>
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

                <div className='flex flex-col items-center p-10 bg-gradient-to-b from-gray-50 to-white'>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-blue-500 blur-2xl opacity-10 rounded-full'></div>
                        <img 
                            className="rounded-full relative border-4 border-white shadow-lg object-cover" 
                            src={defaultUserImage} 
                            alt='profile' 
                            height={160} 
                            width={160} 
                        />
                    </div>
                    <h3 className='mt-6 text-2xl font-bold text-gray-800'>My Account</h3>
                    <p className='text-gray-400 text-sm font-medium tracking-wide uppercase mt-1'>Control Panel</p>
                </div>

                <div className='flex flex-col gap-4 px-10 mt-4 flex-1'>
                    <SidebarButton 
                        label="Change User Details" 
                        onClick={() => setUserDailsVisible(true)} 
                    />
                    <SidebarButton 
                        label="Notification Settings" 
                        onClick={() => setNotificationSettingsVisible(true)} 
                    />

                    <div className='mt-auto mb-10 pt-6 border-t border-gray-100 flex flex-col gap-3'>
                        <button 
                            onClick={handleLogout}
                            className='w-full py-4 text-gray-500 font-semibold hover:text-blue-600 transition-colors'
                        >
                            Logout
                        </button>
                        <button 
                            onClick={() => setDeleteConfirmVisible(true)}
                            className='w-full py-4 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-colors'
                        >
                            Delete My Account
                        </button>
                    </div>
                </div>
            </div>

            {userDailsVisible && (
                <UserDetails toggle={userDailsVisible} action={() => setUserDailsVisible(false)} />
            )}
            {notificationSettingsVisible && (
                <NotificationSettings toggle={notificationSettingsVisible} action={() => setNotificationSettingsVisible(false)} />
            )}
            {deleteConfirmVisible && (
                <DeleteConfirmation toggle={deleteConfirmVisible} action={() => setDeleteConfirmVisible(false)} />
            )}
        </>
    );
};

const SidebarButton = ({ label, onClick }) => (
    <button 
        onClick={onClick}
        className='w-full p-5 bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all text-left'
    >
        {label}
    </button>
);

export default Sidebar;
