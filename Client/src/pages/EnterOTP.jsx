import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnterOTP = () => {
    const [otp, setOtp] = useState({
        OTP: Number,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setOtp(e.target.value);
        console.log(otp)
        setError('');
        setSuccess('');
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = otp;

        if (!email) {
            setError('Please Enter Your Email');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const res = await axios.post('http://localhost:3000/api/otp', {
                email
            });

            setSuccess('OTP Sent Successfully');
            // Optional: Save token to localStorage, redirect, etc.
        } catch (err) {
            setError(err.response?.data?.message || "Can't Send OTP.Check Email.");
        } finally {
            setLoading(false);
            navigate('/EnterOTP')
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary text-dark-text px-4 py-10">
            <div className="w-full max-w-md bg-dark-secondary rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold  mb-6 text-center"><span className='text-dark-accent'> OTP</span>Verification</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* /* OTP */} 
                 <div> 
                      
                      
                                            <label className="block text-dark-text mb-1">Enter OTP</label>
                                            <input
                                                type="number"
                                                name="number"
                                                value={otp.OTP}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-2 rounded-lg bg-dark-primary text-dark-text border border-dark-accent focus:outline-none focus:ring-2 focus:ring-dark-accent"
                                                onWheel={(e) => e.target.blur()} // Prevents the number input side bar
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
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnterOTP;
