import api from "../utils/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { lock, user } from "../assets/icons";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        console.log("click")
        setError('');

        try {
            const res = await axiosInstance.post('http://localhost:8765/login', formData);

            if (res.status === 200) {
                navigate('/')
            } else {
                const errorText = await res.text();
                setError(errorText);
            }
        } catch (error) {
            setError('An error occured during login');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-auth bg-cover">
            <div className="bg-white rounded-3xl flex justify-center items-center flex-col padding min-w-[35rem]">
                <h2 className="text-6xl font-monserat font-bold leading-normal">Login</h2>
                <form className="w-full flex flex-col mt-10 gap-10 ">
                    <Input icon={user} name="username" label="Username" placeholder="Type your username" type="text" onChange={(e) => handleChange(e)}/>
                    <Input icon={lock} name="password" label="Password" placeholder="Type your password" type="password" onChange={(e) => handleChange(e)}/>
                    <Button label="Login" onClick={() => handleSubmit()} />
                </form>
            </div>
        </div>
    );
};

export default Login;
