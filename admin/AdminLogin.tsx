
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useTheme } from '../context/ThemeContext';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(username, password);
    setIsLoading(false);

    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-backgroundDark transition-colors duration-300">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
            Login
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          This is a simulated admin panel. Use username: "admin", password: "password123".
        </p>
      </Card>
    </div>
  );
};
