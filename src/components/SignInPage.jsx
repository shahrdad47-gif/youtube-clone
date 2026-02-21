import { useState } from 'react';

const ACCOUNTS_KEY = 'yt_accounts';

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAccount(account) {
  const accounts = getAccounts();
  const existing = accounts.findIndex(a => a.email === account.email);
  if (existing >= 0) {
    accounts[existing] = account;
  } else {
    accounts.push(account);
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function SignInPage({ onSignIn, onBack }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const accounts = getAccounts();
    const account = accounts.find(a => a.email === email);
    if (!account) {
      setError('No account found with that email. Create one instead.');
      return;
    }
    if (account.password !== password) {
      setError('Wrong password. Try again.');
      return;
    }

    onSignIn({ name: account.name, email: account.email, avatar: account.avatar });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const accounts = getAccounts();
    if (accounts.find(a => a.email === email)) {
      setError('An account with this email already exists. Sign in instead.');
      return;
    }

    const name = lastName ? `${firstName} ${lastName}` : firstName;
    const avatarId = Math.floor(Math.random() * 70) + 1;
    const avatar = `https://i.pravatar.cc/150?img=${avatarId}`;

    const account = { name, email, password, avatar };
    saveAccount(account);

    onSignIn({ name, email, avatar });
  };

  const handleGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        {mode === 'signin' ? (
          <form className="signin-form" onSubmit={handleSignIn}>
            <div className="signin-header">
              <svg viewBox="0 0 75 24" width="75" height="24">
                <path fill="#EA4335" d="M10.08 10.86c0-.84-.08-1.65-.22-2.42H0v4.58h5.66c-.24 1.32-.98 2.44-2.1 3.19v2.65h3.4c1.97-1.82 3.12-4.5 3.12-7.99z" />
                <path fill="#34A853" d="M0 17.16c2.85 0 5.24-.94 6.99-2.56l-3.4-2.65c-.95.63-2.15 1.01-3.59 1.01-2.76 0-5.1-1.87-5.93-4.38H-8.8v2.73C-7.04 15.09-3.82 17.16 0 17.16z" />
                <path fill="#FBBC05" d="M-5.93 8.58c-.22-.63-.34-1.31-.34-2.02s.12-1.39.34-2.02V1.81H-8.8C-9.57 3.33-10 5.07-10 6.86c0 1.8.43 3.54 1.2 5.06l2.87-2.34z" />
                <path fill="#4285F4" d="M0 2.46c1.55 0 2.95.54 4.05 1.59l3.03-3.03C5.22.39 2.85-.6 0-.6c-3.82 0-7.04 2.07-8.8 5.14l2.87 2.34C-5.1 4.33-2.76 2.46 0 2.46z" />
              </svg>
              <h1>Sign in</h1>
              <p>to continue to YouTube</p>
            </div>

            <input
              className="signin-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <input
              className="signin-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="signin-error">{error}</p>}

            <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); }}>
              Forgot password?
            </a>

            <div className="signin-actions">
              <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); setError(''); }}>
                Create account
              </a>
              <button className="signin-btn" type="submit">Sign in</button>
            </div>

            <div className="signin-divider">
              <span>or</span>
            </div>

            <button className="signin-google-btn" type="button" onClick={handleGoogleSignIn}>
              <svg viewBox="0 0 48 48" width="20" height="20">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Sign in with Google
            </button>
          </form>
        ) : (
          <form className="signin-form" onSubmit={handleSignUp}>
            <div className="signin-header">
              <svg viewBox="0 0 75 24" width="75" height="24">
                <path fill="#EA4335" d="M10.08 10.86c0-.84-.08-1.65-.22-2.42H0v4.58h5.66c-.24 1.32-.98 2.44-2.1 3.19v2.65h3.4c1.97-1.82 3.12-4.5 3.12-7.99z" />
                <path fill="#34A853" d="M0 17.16c2.85 0 5.24-.94 6.99-2.56l-3.4-2.65c-.95.63-2.15 1.01-3.59 1.01-2.76 0-5.1-1.87-5.93-4.38H-8.8v2.73C-7.04 15.09-3.82 17.16 0 17.16z" />
                <path fill="#FBBC05" d="M-5.93 8.58c-.22-.63-.34-1.31-.34-2.02s.12-1.39.34-2.02V1.81H-8.8C-9.57 3.33-10 5.07-10 6.86c0 1.8.43 3.54 1.2 5.06l2.87-2.34z" />
                <path fill="#4285F4" d="M0 2.46c1.55 0 2.95.54 4.05 1.59l3.03-3.03C5.22.39 2.85-.6 0-.6c-3.82 0-7.04 2.07-8.8 5.14l2.87 2.34C-5.1 4.33-2.76 2.46 0 2.46z" />
              </svg>
              <h1>Create your Google Account</h1>
              <p>to continue to YouTube</p>
            </div>

            <div className="signin-name-row">
              <input
                className="signin-input"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
              <input
                className="signin-input"
                type="text"
                placeholder="Last name (optional)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              className="signin-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="signin-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="signin-input"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="signin-error">{error}</p>}

            <div className="signin-actions">
              <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); setError(''); }}>
                Sign in instead
              </a>
              <button className="signin-btn" type="submit">Create account</button>
            </div>
          </form>
        )}

        <button className="signin-back-btn" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="#8ab4f8" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to YouTube
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
