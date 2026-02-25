import { useState, useEffect, useRef } from 'react';

const ACCOUNTS_KEY = 'yt_accounts';

function getAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || []; }
  catch { return []; }
}

function saveAccount(account) {
  const accounts = getAccounts();
  const i = accounts.findIndex(a => a.email === account.email);
  if (i >= 0) accounts[i] = account; else accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

const YTLogo = () => (
  <svg viewBox="0 0 90 20" width="90" height="20">
    <path fill="#FF0000" d="M17.58 3.18S17.34 1.55 16.64.83C15.73-.12 14.71-.12 14.24-.07 11.9.1 8.45.1 8.45.1S5 .1 2.66-.07C2.19-.12 1.17-.12.26.83-.44 1.55-.68 3.18-.68 3.18S-.93 5.08-.93 6.99v1.78c0 1.9.25 3.81.25 3.81s.24 1.63.94 2.35c.91.96 2.1.93 2.63 1.02C4.77 15.08 8.45 15.1 8.45 15.1s3.46-.05 5.79-.22c.47-.06 1.49-.06 2.4-1.01.7-.72.94-2.35.94-2.35s.25-1.9.25-3.81V6.99c0-1.9-.25-3.81-.25-3.81zM6.73 10.33V4.56l6.47 2.9-6.47 2.87z"/>
    <text x="22" y="15" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#fff" letter-spacing="-0.3">YouTube</text>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

function SignInPage({ onSignIn, onBack }) {
  const [view, setView] = useState('main'); // main | email | signup
  const googleBtnRef = useRef(null);

  useEffect(() => {
    const render = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_black',
          size: 'large',
          width: 300,
          text: 'continue_with',
          shape: 'rectangular',
        });
      }
    };
    if (window.google?.accounts?.id) {
      render();
    } else {
      const id = setInterval(() => {
        if (window.google?.accounts?.id) { render(); clearInterval(id); }
      }, 200);
      return () => clearInterval(id);
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const account = getAccounts().find(a => a.email === email);
    if (!account) { setError('No account found. Create one instead.'); return; }
    if (account.password !== password) { setError('Wrong password. Try again.'); return; }
    onSignIn({ name: account.name, email: account.email, avatar: account.avatar });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    if (!firstName || !email || !password || !confirmPassword) { setError('Please fill in all required fields.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    if (getAccounts().find(a => a.email === email)) { setError('Account already exists. Sign in instead.'); return; }
    const name = lastName ? `${firstName} ${lastName}` : firstName;
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
    saveAccount({ name, email, password, avatar });
    onSignIn({ name, email, avatar });
  };

  return (
    <div className="signin-page">
      <div className="signin-card">

        {/* ── Main view: Google first ── */}
        {view === 'main' && (
          <div className="signin-form">
            <div className="signin-header">
              <YTLogo />
              <h1>Sign in</h1>
              <p>to continue to YouTube</p>
            </div>

            {/* Primary: Google — rendered by Google SDK */}
            <div ref={googleBtnRef} style={{ minHeight: 44, display: 'flex', justifyContent: 'center' }} />

            <div className="signin-divider"><span>or</span></div>

            {/* Secondary: email */}
            <button className="signin-email-btn" type="button" onClick={() => setView('email')}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#8ab4f8" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Sign in with email
            </button>

            <div className="signin-main-footer">
              <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); setView('signup'); }}>
                Create account
              </a>
            </div>
          </div>
        )}

        {/* ── Email / password view ── */}
        {view === 'email' && (
          <form className="signin-form" onSubmit={handleSignIn}>
            <div className="signin-header">
              <YTLogo />
              <h1>Sign in</h1>
              <p>to continue to YouTube</p>
            </div>

            <input className="signin-input" type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} autoFocus />
            <input className="signin-input" type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="signin-error">{error}</p>}

            <a className="signin-link" href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>

            <div className="signin-actions">
              <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); setView('signup'); setError(''); }}>
                Create account
              </a>
              <button className="signin-btn" type="submit">Sign in</button>
            </div>

            <button className="signin-back-to-main" type="button" onClick={() => { setView('main'); setError(''); }}>
              ← Other sign-in options
            </button>
          </form>
        )}

        {/* ── Sign up view ── */}
        {view === 'signup' && (
          <form className="signin-form" onSubmit={handleSignUp}>
            <div className="signin-header">
              <YTLogo />
              <h1>Create account</h1>
              <p>to continue to YouTube</p>
            </div>

            <div className="signin-name-row">
              <input className="signin-input" type="text" placeholder="First name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} autoFocus />
              <input className="signin-input" type="text" placeholder="Last name (optional)" value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input className="signin-input" type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input className="signin-input" type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <input className="signin-input" type="password" placeholder="Confirm password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />

            {error && <p className="signin-error">{error}</p>}

            <div className="signin-actions">
              <a className="signin-link" href="#" onClick={(e) => { e.preventDefault(); setView('main'); setError(''); }}>
                Sign in instead
              </a>
              <button className="signin-btn" type="submit">Create account</button>
            </div>
          </form>
        )}

        <button className="signin-back-btn" type="button" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="#8ab4f8" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to YouTube
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
