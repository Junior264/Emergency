import React from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useState } from "react";
import { cancel } from '../assets/icons';
import { defaultUserImage } from '../assets/images';
import Button from './Button';
import UserDetails from './UserDetails';
import NotificationSettings from './NotificationSettings';
import DeleteConfirmation from './DeleteConfirmation';

const Sidebar = ({toggle}) => {
    const [userDailsVisible, setUserDailsVisible] = useState(false);
    const [notificationSettingsVisible, setNotificationSettingsVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

    const handleUserDailsVisible = () => {
        setUserDailsVisible(!userDailsVisible);
    };

    const handleNotificationSettingsVisible = () => {
        setNotificationSettingsVisible(!notificationSettingsVisible);
    };
    
    const handleDeleteConfirmVisible = () => {
        setDeleteConfirmVisible(!deleteConfirmVisible);
    };
    

    return (
        <div id="sidebar" className='bg-amber-400 flex flex-col min-w-[50%]'>
            <div className='flex justify-end p-1.5 cursor-pointer'>
                <img src={cancel} width={25} height={25} alt='close' onClick={toggle} />
            </div>
            <div className='flex justify-center p-10'>
                <img className="rounded-full" src={defaultUserImage} alt='profilePicture' height={180} width={180} />
            </div>
            <div className='flex justify-center flex-col gap-5 padding-x'>
                <Button label="Change User details" onClick={handleUserDailsVisible} />
                <Button label="Change Notification settings" onClick={handleNotificationSettingsVisible} />
                <Button label="Logout" />
                <Button label="Delete My Account" onClick={handleDeleteConfirmVisible} />
            </div>
            {userDailsVisible && <UserDetails toggle={userDailsVisible} action={handleUserDailsVisible} />}
            <NotificationSettings toggle={notificationSettingsVisible} action={handleNotificationSettingsVisible} />
            <DeleteConfirmation toggle={deleteConfirmVisible} action={handleDeleteConfirmVisible} />
        </div>
    );
}

export default Sidebar
