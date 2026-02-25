import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { lock, user } from "../assets/icons";
import { UseAuth } from "../components/AuthContext";

const Registration = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registration } = UseAuth();

    const handleSubmit = async (e) => {
        setError('');
        try {
            if (password === confirmPassword) {
                await registration(username, password);
                navigate("/login");
            } else {
                setError('Confirm password is different from password.');
            }
        } catch (error) {
            setError('Registration failed for some reason.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-auth bg-cover font-montserrat p-4">
            <div className='bg-white min-w-[35vw] max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden'>
                
                <div className='flex justify-between items-center p-8 border-b'>
                    <h2 className='text-3xl font-bold text-gray-800'>Register</h2>
                    <div className="bg-gray-100 p-2 rounded-full opacity-0">
                        <div className="w-6 h-6"></div>
                    </div>
                </div>

                <div className='p-10 flex flex-col gap-6 overflow-y-auto'>
                    {error && (
                        <div className="bg-gray-50 border border-red-100 p-4 rounded-xl text-red-500 font-bold text-center text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <Input 
                            icon={user} 
                            name="username" 
                            label="Username" 
                            placeholder="Choose a username" 
                            type="text" 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        
                        <Input 
                            icon={lock} 
                            name="password" 
                            label="Password" 
                            placeholder="Create a password" 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input 
                            icon={lock} 
                            name="confirmPassword" 
                            label="Confirm Password" 
                            placeholder="Repeat your password" 
                            type="password" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-4 mt-2'>
                        <Button label="Create Account" onClick={handleSubmit} />
                        
                        <div className="flex flex-col items-center gap-2 mt-4 pt-6 border-t border-gray-50">
                            <p className="text-gray-400 text-sm">Already have an account?</p>
                            <button 
                                onClick={() => navigate('/login')}
                                className='text-blue-500 font-bold hover:text-blue-600 transition-colors'
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
