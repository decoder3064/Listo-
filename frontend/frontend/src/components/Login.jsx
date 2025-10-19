import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value,});
    };

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData);

        setLoading(false);

        if(result.success){
            navigate('/dashboard')
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-box">
            <h2>Login</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            </form>

            <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
        </div>
    )
}

export default Login;