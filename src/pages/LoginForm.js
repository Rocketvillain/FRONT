import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
        localStorage.setItem('token', data.token); // 토큰 저장
        localStorage.setItem('role', data.role); // 권한 저장
        window.location.href = '/'; // 로그인 후 리다이렉트
        } else {
        setError(data.message || 'Login failed');
        }
    } catch (err) {
        setError('An error occurred. Please try again.');
    }
    };

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
    </form>
    );
}

export default LoginForm;
