import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const validatePassword = (password) => {
        const isValid =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /\d/.test(password);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be 8+ chars, include 1 uppercase & 1 number.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const response = await axios.post('https://your-backend-url.com/api/register', {
                name,
                email,
                password,
            });

            setSuccess('Registration successful!');
            setFormData({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary text-dark-text px-4 py-10">
            <div className="w-full max-w-md bg-dark-secondary rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold  mb-6 text-center">Register to <span className='text-dark-accent'> MovieSquare</span> </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-dark-text mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-[#F05454] focus:outline-none focus:ring-2 focus:ring-[#F05454]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-dark-text mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-[#F05454] focus:outline-none focus:ring-2 focus:ring-[#F05454]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-dark-text mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-[#F05454] focus:outline-none focus:ring-2 focus:ring-[#F05454]"
                        />
                    </div>

                    {/* Error or Success */}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-400">{success}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F05454] text-dark-text font-semibold py-2 rounded-lg hover:bg-[#d94343] transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
