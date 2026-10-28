import { useEffect, useState } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import MainContent from './components/MainContent.jsx';
import { benefits, testimonials, travelStyles } from './data/destinations.js';

const initialFormState = {
  name: '',
  email: '',
  password: '',
};

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState(initialFormState);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  useEffect(() => {
    fetchDestinations();
    fetchCurrentUser();
  }, []);

  async function fetchDestinations() {
    try {
      const response = await fetch('/api/destinations');

      if (!response.ok) {
        throw new Error('Unable to fetch destinations.');
      }

      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Destination fetch failed:', error);
      setDestinations([]);
    } finally {
      setLoadingDestinations(false);
    }
  }

  async function fetchCurrentUser() {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include' });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('User session check failed:', error);
      setUser(null);
    }
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const payload = authMode === 'login'
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed.');
      }

      setUser(data.user);
      setAuthOpen(false);
      setFormData(initialFormState);
      setStatusMessage(authMode === 'login' ? 'Welcome back! You are signed in.' : 'Account created successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setStatusMessage('You have been signed out.');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }

  return (
    <>
      <Header
        user={user}
        onAuthToggle={() => {
          setStatusMessage('');
          setErrorMessage('');
          setAuthOpen((current) => !current);
        }}
        onSignOut={handleLogout}
      />

      {authOpen && !user && (
        <section className="border-b border-trail-border bg-trail-surface">
          <div className="mx-auto w-[calc(100%-2rem)] max-w-site py-6 sm:w-[calc(100%-3rem)]">
            <div className="rounded-[20px] border border-trail-border bg-white p-5 shadow-card sm:p-6">
              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${authMode === 'login' ? 'bg-trail-green text-white' : 'border border-trail-border text-trail-green'}`}
                  type="button"
                  onClick={() => setAuthMode('login')}
                >
                  Sign in
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${authMode === 'signup' ? 'bg-trail-green text-white' : 'border border-trail-border text-trail-green'}`}
                  type="button"
                  onClick={() => setAuthMode('signup')}
                >
                  Create account
                </button>
              </div>

              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleAuthSubmit}>
                {authMode === 'signup' && (
                  <label className="grid gap-2 text-sm font-semibold text-trail-forest md:col-span-2">
                    Full name
                    <input
                      className="rounded-xl border border-trail-border bg-trail-tint px-3 py-2.5 text-base text-trail-ink outline-none ring-0 transition focus:border-trail-green"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      placeholder="Your name"
                    />
                  </label>
                )}

                <label className="grid gap-2 text-sm font-semibold text-trail-forest md:col-span-2">
                  Email
                  <input
                    className="rounded-xl border border-trail-border bg-trail-tint px-3 py-2.5 text-base text-trail-ink outline-none ring-0 transition focus:border-trail-green"
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-trail-forest md:col-span-2">
                  Password
                  <input
                    className="rounded-xl border border-trail-border bg-trail-tint px-3 py-2.5 text-base text-trail-ink outline-none ring-0 transition focus:border-trail-green"
                    type="password"
                    value={formData.password}
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    placeholder="At least 6 characters"
                    required
                  />
                </label>

                <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-trail-orange bg-trail-orange px-5 text-sm font-bold text-white transition hover:border-trail-green hover:bg-trail-green"
                    type="submit"
                  >
                    {authMode === 'login' ? 'Sign in' : 'Create account'}
                  </button>

                  {statusMessage && <p className="text-sm font-medium text-trail-green">{statusMessage}</p>}
                  {errorMessage && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      <Hero />
      <MainContent
        destinations={destinations}
        loading={loadingDestinations}
        travelStyles={travelStyles}
        benefits={benefits}
        testimonials={testimonials}
        user={user}
      />
      <Footer />
    </>
  );
}
