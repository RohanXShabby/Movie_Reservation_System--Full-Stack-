import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const res = await axios.post('https://your-backend-url.com/api/login', {
                email,
                password,
            });

            setSuccess('Login successful!');
            // Optional: Save token to localStorage, redirect, etc.
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary text-dark-text px-4 py-10">
            <div className="w-full max-w-md bg-dark-secondary rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold  mb-6 text-center">Login to <span className='text-dark-accent'> MovieSquare</span></h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-dark-text mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-dark-accent focus:outline-none focus:ring-2 focus:ring-dark-accent"
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
                            className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-dark-accent focus:outline-none focus:ring-2 focus:ring-dark-accent"
                        />
                    </div>

                    {/* Error/Success */}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-400">{success}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F05454] text-dark-text font-semibold py-2 rounded-lg hover:bg-[#d94343] transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
