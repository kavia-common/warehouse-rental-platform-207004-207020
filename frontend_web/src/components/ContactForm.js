import React, { useState } from 'react';
import { oceanTheme } from '../theme';

/**
 * Contact form to inquire about warehouse listing. (UI, no backend.)
 * Props:
 *   listing (object): the warehouse being contacted about (optional)
 *   onSubmit (function): called with {name, email, phone, message}
 *   onCancel (function): optional, when user closes form
 */
// PUBLIC_INTERFACE
export default function ContactForm({ listing, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  // PUBLIC_INTERFACE
  function validate(fields) {
    const next = {};
    if (!fields.name.trim()) next.name = 'Name required';
    if (!fields.email.trim()) next.email = 'Email required';
    else if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = 'Invalid email address';
    if (!fields.phone.trim()) next.phone = 'Phone required';
    else if (!/^[0-9-+ ()]{7,}$/.test(fields.phone)) next.phone = 'Invalid phone';
    if (!fields.message.trim()) next.message = 'Please enter a message';
    return next;
  }

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      if (onSubmit) onSubmit(form);
    }, 650); // fake API
  }

  if (status === 'success') {
    return (
      <div style={{
        background: oceanTheme.surface,
        borderRadius: oceanTheme.cardRadius,
        padding: '2.2rem',
        textAlign: 'center',
        color: oceanTheme.primary,
        fontWeight: 600,
        fontSize: 18
      }}>
        <div>Thank you for your interest!<br />We will contact you soon.</div>
        {onCancel && <button
          onClick={onCancel}
          style={{
            background: oceanTheme.secondary, color: '#fff', border: 0, borderRadius: 7, fontWeight: 600, fontSize: 15, marginTop: 22, padding: '10px 18px'
          }}
          data-testid="contact-close-btn"
          aria-label="Close Contact Confirmation"
        >Close</button>}
      </div>
    );
  }

  return (
    <form
      style={{
        background: oceanTheme.surface,
        borderRadius: oceanTheme.cardRadius,
        boxShadow: oceanTheme.shadow,
        padding: '2.2rem 2.2rem 1.25rem 2.2rem',
        maxWidth: 410,
        margin: '2rem auto',
        color: oceanTheme.text,
        transition: oceanTheme.transition
      }}
      onSubmit={handleSubmit}
      aria-label="Contact Form"
      autoComplete="off"
    >
      <div style={{ fontWeight: 700, color: oceanTheme.primary, fontSize: 19, marginBottom: 2 }}>
        Contact About {listing ? listing.title : 'Warehouse'}
      </div>
      {['name', 'email', 'phone'].map(field => (
        <label key={field} style={{ display: 'block', margin: '18px 0 0 0', fontWeight: 600 }}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            aria-label={field}
            value={form[field]}
            onChange={handleChange}
            style={{
              display: 'block',
              width: '100%',
              marginTop: 3, marginBottom: 0,
              fontSize: 15,
              padding: '9px 9px',
              borderRadius: 7,
              border: `1.2px solid ${oceanTheme.primary}35`,
              outline: errors[field] ? `2.3px solid ${oceanTheme.error || '#EF4444'}` : 'none',
              background: '#f8fafc',
              color: oceanTheme.text
            }}
          />
          {errors[field] && <div style={{
            color: oceanTheme.error || '#EF4444', fontSize: 13, marginLeft: 3, marginTop: 2
          }}>{errors[field]}</div>}
        </label>
      ))}
      <label style={{ display: 'block', margin: '19px 0 0 0', fontWeight: 600 }}>
        Message
        <textarea
          name="message"
          aria-label="Message"
          value={form.message}
          onChange={handleChange}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 4, marginBottom: 0,
            fontSize: 15,
            padding: '9px 9px',
            borderRadius: 7,
            border: `1.2px solid ${oceanTheme.primary}35`,
            outline: errors.message ? `2.3px solid ${oceanTheme.error || '#EF4444'}` : 'none',
            background: '#f8fafc',
            minHeight: 66,
            color: oceanTheme.text
          }}
        />
        {errors.message && <div style={{ color: oceanTheme.error || '#EF4444', fontSize: 13, marginLeft: 3, marginTop: 2 }}>
          {errors.message}
        </div>}
      </label>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, marginTop: 26 }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: '#F3F4F6', color: oceanTheme.primary, border: 0, borderRadius: 7, fontWeight: 600, fontSize: 15, padding: '10px 18px', opacity: .78
            }}
            data-testid="contact-cancel-btn"
            aria-label="Cancel Contact Form"
          >Cancel</button>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            background: oceanTheme.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            fontWeight: 600,
            fontSize: 15,
            padding: '10px 18px',
            boxShadow: '0 2px 8px rgba(37,99,235,0.06)',
            cursor: 'pointer',
            opacity: status === 'submitting' ? 0.65 : 1
          }}
          data-testid="contact-submit-btn"
          aria-label="Send Message"
        >
          {status === 'submitting' ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
}
