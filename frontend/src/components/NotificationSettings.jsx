import React, { useEffect, useState } from 'react';
import api from '../utils/index';
import Input from './Input';
import Button from './Button';
import Select from './Select';

const NotificationSettings = ({ toggle, action }) => {
    const [notifications, setNotifications] = useState([]);
    const [view, setView] = useState('list');
    const [currentEdit, setCurrentEdit] = useState(null);
    const [notificationType, setNotificationType] = useState("EMAIL");
    const [notificationValue, setNotificationValue] = useState("");

    useEffect(() => {
        if (toggle) fetchData();
    }, [toggle]);

    const fetchData = async () => {
        try {
            const response = await api.get('/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const resetForm = () => {
        setNotificationType("EMAIL");
        setNotificationValue("");
        setCurrentEdit(null);
        setView('list');
    };

    const handleSubmit = async () => {
        try {
            const payload = { notificationType, notificationValue };
            if (view === 'edit') {
                await api.put(`/notifications/${currentEdit.id}`, payload);
            } else {
                await api.post('/notifications', payload);
            }
            fetchData();
            resetForm();
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this notification?")) {
            try {
                await api.delete(`/notifications/${id}`);
                fetchData();
                resetForm();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const openEdit = (item) => {
        setCurrentEdit(item);
        setNotificationType(item.type);
        setNotificationValue(item.notificationValue);
        setView('edit');
    };

    return (
        <div className={`fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center ${toggle ? '' : 'hidden'}`}>
            <div className='bg-white min-w-[35vw] max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200'>
                
                <div className='flex justify-between items-center p-8 border-b border-gray-100'>
                    <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>
                        {view === 'list' ? 'Notifications' : view === 'create' ? 'Add New' : 'Update'}
                    </h2>
                    
                    <button 
                        onClick={() => { resetForm(); action(); }}
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

                <div className='p-10 overflow-y-auto'>
                    {view === 'list' ? (
                        <div className='flex flex-col min-h-[30vh]'>
                            {notifications.length > 0 ? (
                                <div className='grid gap-5'>
                                    {notifications.map((item) => (
                                        <div key={item.id} className='group flex justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-white transition-all shadow-sm'>
                                            <div>
                                                <p className='text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1'>{item.type}</p>
                                                <p className='text-gray-700 font-bold text-lg'>{item.notificationValue}</p>
                                            </div>
                                            <button 
                                                onClick={() => openEdit(item)}
                                                className='bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95'
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => setView('create')}
                                        className='mt-4 w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-300 hover:text-blue-400 hover:border-blue-300 hover:bg-gray-50 transition-all font-bold tracking-widest uppercase'
                                    >
                                        + Add Contact
                                    </button>
                                </div>
                            ) : (
                                <div className='flex-1 flex flex-col justify-center items-center py-12'>
                                    <div className='text-6xl mb-6 grayscale opacity-20'>🔔</div>
                                    <p className='text-2xl font-bold text-gray-200 uppercase tracking-tighter'>Empty List</p>
                                    <p className='text-gray-400 text-center mb-8'>No notification contacts set yet.</p>
                                    <Button label="Create First Entry" onClick={() => setView('create')} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-8'>
                            <div className="space-y-6">
                                <Select
                                    label="Notification Type"
                                    options={[{value: "EMAIL", text: "Email"}, {value: "SMS", text: "SMS"}]}
                                    onChange={value => setNotificationType(value)}
                                    defaultValue={notificationType}
                                />
                                <br />
                                <Input 
                                    name="value" 
                                    label="Receiver Address" 
                                    placeholder={notificationType === 'EMAIL' ? 'name@company.com' : '+49 123...'} 
                                    value={notificationValue}
                                    onChange={(e) => setNotificationValue(e.target.value)}
                                />
                            </div>
                            
                            <div className='flex flex-col gap-4 mt-4'>
                                <Button label={view === 'edit' ? "Update Details" : "Save Contact"} onClick={handleSubmit} />
                                {view === 'edit' && (
                                    <button 
                                        onClick={() => handleDelete(currentEdit.id)}
                                        className='w-full py-4 text-red-400 font-bold hover:text-red-600 transition-colors text-xs uppercase tracking-widest'
                                    >
                                        Delete this entry
                                    </button>
                                )}
                                <button 
                                    onClick={resetForm}
                                    className='text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
