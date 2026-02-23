import { useState } from 'react';

const GOOGLE_ACCOUNTS_KEY = 'yt_google_accounts';

function getGoogleAccounts() {
  try { return JSON.parse(localStorage.getItem(GOOGLE_ACCOUNTS_KEY)) || []; }
  catch { return []; }
}

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" width="44" height="44">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

function GoogleSignInPage({ onSignIn, onBack }) {
  const savedAccounts = getGoogleAccounts();

  // If accounts exist → show picker first, else go straight to email
  const [step, setStep] = useState(savedAccounts.length > 0 ? 'picker' : 'email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const accounts = getGoogleAccounts();

  // Pick existing account → go straight to password
  const handlePickAccount = (account) => {
    setSelectedEmail(account.email);
    setEmail(account.email);
    setStep('password');
  };

  const handleEmailNext = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    const exists = accounts.find(a => a.email === email);
    if (exists) { setSelectedEmail(email); setStep('password'); }
    else { setStep('create'); }
  };

  const handlePasswordSignIn = (e) => {
    e.preventDefault();
    setError('');
    const account = accounts.find(a => a.email === email);
    if (!account || account.password !== password) { setError('Wrong password. Try again.'); return; }
    onSignIn({ name: account.name, email: account.email, avatar: account.avatar });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError('');
    if (!firstName) { setError('Enter your first name.'); return; }
    if (newPassword.length < 4) { setError('Password must be at least 4 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    const name = lastName ? `${firstName} ${lastName}` : firstName;
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
    const account = { name, email, password: newPassword, avatar };
    const all = getGoogleAccounts();
    all.push(account);
    localStorage.setItem(GOOGLE_ACCOUNTS_KEY, JSON.stringify(all));
    onSignIn({ name, email, avatar });
  };

  return (
    <div className="google-signin-page">
      <div className="google-signin-card">
        <div className="google-signin-logo"><GoogleLogo /></div>

        {/* ── Account picker ── */}
        {step === 'picker' && (
          <div>
            <h1 className="google-signin-title">Choose an account</h1>
            <p className="google-signin-subtitle">to continue to YouTube</p>

            <div className="gsi-account-list">
              {accounts.map((acc) => (
                <button
                  key={acc.email}
                  className="gsi-account-row"
                  type="button"
                  onClick={() => handlePickAccount(acc)}
                >
                  <img className="gsi-account-avatar" src={acc.avatar} alt="" />
                  <div className="gsi-account-info">
                    <p className="gsi-account-name">{acc.name}</p>
                    <p className="gsi-account-email">{acc.email}</p>
                  </div>
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#9aa0a6" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              ))}

              {/* Use another account */}
              <button
                className="gsi-account-row gsi-another"
                type="button"
                onClick={() => { setEmail(''); setStep('email'); }}
              >
                <div className="gsi-account-avatar gsi-avatar-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path fill="#e8eaed" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14c-2.67 0-5.03-1.3-6.47-3.3C6.92 14.7 9.37 14 12 14s5.08.7 6.47 1.7C16.97 17.7 14.67 20 12 20z"/>
                  </svg>
                </div>
                <div className="gsi-account-info">
                  <p className="gsi-account-name">Use another account</p>
                </div>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#9aa0a6" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            <div className="google-signin-actions" style={{justifyContent:'flex-end', marginTop: 16}}>
              <button className="google-signin-back-btn" type="button" onClick={onBack}>Back</button>
            </div>
          </div>
        )}

        {/* ── Email step ── */}
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
              <button className="google-signin-back-btn" type="button"
                onClick={() => accounts.length > 0 ? setStep('picker') : onBack()}>
                Back
              </button>
              <button className="google-signin-next-btn" type="submit">Next</button>
            </div>
          </form>
        )}

        {/* ── Password step ── */}
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
              <button className="google-signin-back-btn" type="button"
                onClick={() => { setStep(accounts.length > 0 ? 'picker' : 'email'); setError(''); }}>
                Back
              </button>
              <button className="google-signin-next-btn" type="submit">Next</button>
            </div>
          </form>
        )}

        {/* ── Create account step ── */}
        {step === 'create' && (
          <form onSubmit={handleCreateAccount}>
            <h1 className="google-signin-title">Create your Google Account</h1>
            <p className="google-signin-subtitle">{email}</p>
            <div className="google-signin-name-row">
              <input className="google-signin-input" type="text" placeholder="First name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
              <input className="google-signin-input" type="text" placeholder="Last name (optional)"
                value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input className="google-signin-input" type="password" placeholder="Password"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input className="google-signin-input" type="password" placeholder="Confirm password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && <p className="google-signin-error">{error}</p>}
            <div className="google-signin-actions">
              <button className="google-signin-back-btn" type="button"
                onClick={() => { setStep('email'); setError(''); }}>
                Back
              </button>
              <button className="google-signin-next-btn" type="submit">Create account</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoogleSignInPage;
