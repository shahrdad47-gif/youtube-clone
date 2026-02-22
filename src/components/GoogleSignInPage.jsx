import { useState } from 'react';

const GOOGLE_ACCOUNTS_KEY = 'yt_google_accounts';

function getGoogleAccounts() {
  try {
    return JSON.parse(localStorage.getItem(GOOGLE_ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
}

function GoogleSignInPage({ onSignIn, onBack }) {
  const [step, setStep] = useState('email'); // 'email' | 'password' | 'create'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailNext = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    const accounts = getGoogleAccounts();
    const exists = accounts.find(a => a.email === email);
    if (exists) {
      setStep('password');
    } else {
      setStep('create');
    }
  };

  const handlePasswordSignIn = (e) => {
    e.preventDefault();
    setError('');
    const accounts = getGoogleAccounts();
    const account = accounts.find(a => a.email === email);
    if (!account || account.password !== password) {
      setError('Wrong password. Try again.');
      return;
    }
    onSignIn({ name: account.name, email: account.email, avatar: account.avatar });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError('');
    if (!firstName) {
      setError('Enter your first name.');
      return;
    }
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const name = lastName ? `${firstName} ${lastName}` : firstName;
    const avatarId = Math.floor(Math.random() * 70) + 1;
    const avatar = `https://i.pravatar.cc/150?img=${avatarId}`;
    const account = { name, email, password: newPassword, avatar };
    const accounts = getGoogleAccounts();
    accounts.push(account);
    localStorage.setItem(GOOGLE_ACCOUNTS_KEY, JSON.stringify(accounts));
    onSignIn({ name, email, avatar });
  };

  const GoogleLogo = () => (
    <svg viewBox="0 0 48 48" width="44" height="44">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );

  return (
    <div className="google-signin-page">
      <div className="google-signin-card">
        <div className="google-signin-logo">
          <GoogleLogo />
        </div>

        {step === 'email' && (
          <form onSubmit={handleEmailNext}>
            <h1 className="google-signin-title">Sign in</h1>
            <p className="google-signin-subtitle">Use your Google Account</p>
            <input
              className="google-signin-input"
              type="email"
              placeholder="Email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            {error && <p className="google-signin-error">{error}</p>}
            <a className="google-signin-link" href="#" onClick={(e) => { e.preventDefault(); setStep('create'); setError(''); }}>
              Create account
            </a>
            <div className="google-signin-actions">
              <button className="google-signin-back-btn" type="button" onClick={onBack}>Back</button>
              <button className="google-signin-next-btn" type="submit">Next</button>
            </div>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSignIn}>
            <h1 className="google-signin-title">Welcome</h1>
            <p className="google-signin-email-chip">{email}</p>
            <input
              className="google-signin-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="google-signin-error">{error}</p>}
            <a className="google-signin-link" href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
            <div className="google-signin-actions">
              <button className="google-signin-back-btn" type="button" onClick={() => { setStep('email'); setError(''); }}>Back</button>
              <button className="google-signin-next-btn" type="submit">Next</button>
            </div>
          </form>
        )}

        {step === 'create' && (
          <form onSubmit={handleCreateAccount}>
            <h1 className="google-signin-title">Create your Google Account</h1>
            <p className="google-signin-subtitle">{email}</p>
            <div className="google-signin-name-row">
              <input
                className="google-signin-input"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
              <input
                className="google-signin-input"
                type="text"
                placeholder="Last name (optional)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              className="google-signin-input"
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="google-signin-input"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="google-signin-error">{error}</p>}
            <div className="google-signin-actions">
              <button className="google-signin-back-btn" type="button" onClick={() => { setStep('email'); setError(''); }}>Back</button>
              <button className="google-signin-next-btn" type="submit">Create account</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoogleSignInPage;
