import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { lock, user } from "../assets/icons";
import { UseAuth } from "../components/AuthContext";

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = UseAuth();

    const handleSubmit = async (e) => {
        setError('');
        try {
            await login(username, password);
            navigate("/");
        } catch (error) {
            setError('Username or password incorrect.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-auth bg-cover font-montserrat p-4">
            <div className='bg-white min-w-[35vw] max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden'>
                
                <div className='flex justify-between items-center p-8 border-b'>
                    <h2 className='text-3xl font-bold text-gray-800'>Login</h2>
                    <div className="bg-gray-100 p-2 rounded-full opacity-0">
                        <div className="w-6 h-6"></div>
                    </div>
                </div>

                <div className='p-10 flex flex-col gap-8'>
                    {error && (
                        <div className="bg-gray-50 border border-red-100 p-4 rounded-xl text-red-500 font-bold text-center text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-6">
                        <Input 
                            icon={user} 
                            name="username" 
                            label="Username" 
                            placeholder="Type your username" 
                            type="text" 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        
                        <Input 
                            icon={lock} 
                            name="password" 
                            label="Password" 
                            placeholder="Type your password" 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-4 mt-4'>
                        <Button label="Login" onClick={handleSubmit} />
                        
                        <div className="flex flex-col items-center gap-2 mt-4 pt-6 border-t border-gray-50">
                            <p className="text-gray-400 text-sm">Don't have an account?</p>
                            <button 
                                onClick={() => navigate('/register')}
                                className='text-blue-500 font-bold hover:text-blue-600 transition-colors'
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
