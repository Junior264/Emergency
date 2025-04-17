import React from 'react';
import Input from './Input';
import Button from './Button';
import { cancel, lock, user } from '../assets/icons';

const NotificationSettings = ({toggle, action}) => {
    return (
        <div className={`absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-500/90 z-100 flex justify-center items-center ${toggle ? '' : 'hidden'}`}>
            <div className='bg-white min-w-[50vw] min-h-[50vh] rounded-2xl'>
                <div className='flex justify-end p-1 pb-5'>
                    <img className="cursor-pointer select-none" src={cancel} alt='close' height={30} width={30} onClick={action}/>
                </div>
                <div className='padding-x flex flex-col gap-5'>
                    <Input icon={user} name="username" label="Username" placeholder="Type your username" type="text" onChange={(e) => handleChange(e)}/>
                    <Input icon={lock} name="password" label="Password" placeholder="Type your password" type="password" onChange={(e) => handleChange(e)}/>
                </div>
                <div className='padding-x mt-10 flex flex-col'>
                    <Button label="Confirm" onClick={() => handleSubmit()} />
                </div>
                
            </div>
        </div>
    );
};

export default NotificationSettings;
