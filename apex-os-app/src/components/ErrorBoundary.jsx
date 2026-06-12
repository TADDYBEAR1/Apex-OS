import React from 'react';
import { getRawStoredState } from '../utils/storage';

/**
 * Root-level error boundary: without it, a single render exception leaves the
 * phone showing a black screen with no way out. Offers a retry and a raw data
 * export so training history is never lost to a UI bug.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Apex OS crashed:', error, info);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  handleExport = () => {
    const raw = getRawStoredState();
    if (!raw) {
      window.alert('No saved data found to export.');
      return;
    }
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apex-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#000', color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '32px', textAlign: 'center', gap: '16px', zIndex: 1000,
        fontFamily: 'var(--font-body, sans-serif)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: '13px',
          letterSpacing: '0.2em', color: '#FF5C5C', textTransform: 'uppercase',
        }}>SYSTEM FAULT</span>
        <h1 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.2 }}>Something broke.<br/>Your data is safe.</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', maxWidth: '320px' }}>
          {String(this.state.error?.message || this.state.error)}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '300px', marginTop: '8px' }}>
          <button onClick={this.handleRetry} style={{
            padding: '14px', borderRadius: '999px', border: 'none', cursor: 'pointer',
            background: '#00FFCC', color: '#000', fontWeight: 700, fontSize: '14px',
            fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.05em',
          }}>TRY AGAIN</button>
          <button onClick={this.handleExport} style={{
            padding: '14px', borderRadius: '999px', cursor: 'pointer',
            background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '13px',
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.05em',
          }}>EXPORT MY DATA</button>
        </div>
      </div>
    );
  }
}
