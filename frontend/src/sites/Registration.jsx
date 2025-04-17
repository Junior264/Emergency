import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { lock, user } from "../assets/icons";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        role: "USER"
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
        if (formData.password !== formData.confirmPassword) {
            setError('Password do not match');
            return;
        }

        setError('');

        try {
            const response = await fetch("http://localhost:8765/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                navigate('/login')
            } else {
                const errorText = await res.text();
                setError(errorText);
            }
        } catch (error) {
            setError('An error occured during registration');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-auth bg-cover">
            <div className="bg-white rounded-3xl flex justify-center items-center flex-col padding min-w-[35rem]">
                <h2 className="text-6xl font-monserat font-bold leading-normal">Register</h2>
                <form className="w-full flex flex-col mt-10 gap-10 ">
                    <Input icon={user} name="username" label="Username" placeholder="Type your username" type="text" onChange={(e) => handleChange(e)}/>
                    <Input icon={lock} name="password" label="Password" placeholder="Type your password" type="password" onChange={(e) => handleChange(e)}/>
                    <Input icon={lock} name="confirmPassword" label="Confirm Password" placeholder="Confirm your password" type="password" onChange={(e) => handleChange(e)}/>
                    <Button label="Register" onClick={() => handleSubmit()} />
                </form>
            </div>
        </div>
    );
};

export default Registration;
