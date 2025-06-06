import React, { useState } from 'react';

interface LoginFormProps {
    onConnect: (name: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onConnect }) => {
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        onConnect(name.trim() || `Player_${Math.random().toString(36).substr(2, 4)}`);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0f0f23',
            fontFamily: 'monospace'
        }}>
            <div style={{
                backgroundColor: '#1a1a2e',
                border: '2px solid #16213e',
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{
                    color: '#ffffff',
                    fontSize: '24px',
                    marginBottom: '20px'
                }}>
                    Realtime 2D Game
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Enter your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #16213e',
                            backgroundColor: '#0f0f23',
                            color: '#ffffff',
                            outline: 'none'
                        }}
                        maxLength={20}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#4ecdc4',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Join Game
                    </button>
                </form>

                <div style={{
                    color: '#888',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    Use WASD to move around the field
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
