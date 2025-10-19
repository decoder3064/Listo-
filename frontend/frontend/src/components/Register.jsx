import { useState } from 'react';
import { useAuth } from 'frontend/frontend/src/context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');

        if(formData.password.length < 8){
            setError('Password must be at least 8 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const trimmedData = {
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
        };

        setLoading(true);
        const result = await register(trimmedData);
        setLoading(false);

         if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
    
  


