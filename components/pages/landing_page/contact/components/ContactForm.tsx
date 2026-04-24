"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

export function ContactForm() {
  const { t } = useLanguage();
  
  const serviceOptions = [
    { value: "software", label: t.contact.serviceOptions.software },
    { value: "consulting", label: t.contact.serviceOptions.consulting },
    { value: "managed-it", label: t.contact.serviceOptions.managedIt },
    { value: "infra", label: t.contact.serviceOptions.infra },
    { value: "marketing", label: t.contact.serviceOptions.marketing },
    { value: "social", label: t.contact.serviceOptions.social },
  ];

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsDropdownOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDropdownOpen]);

  const selectOption = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isDropdownOpen) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsDropdownOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, serviceOptions.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < serviceOptions.length) {
          selectOption(serviceOptions[highlightedIndex].value);
        }
        break;
    }
  }, [isDropdownOpen, highlightedIndex, selectOption, serviceOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const selectedLabel = serviceOptions.find(o => o.value === formData.service)?.label;

  /** Update a single field */
  function updateField(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  /** Submit the form to the API */
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage(t.contact.errorRequired ?? 'Please fill in all required fields.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? 'Something went wrong.');
      }

      setFormStatus('success');
      setFormData(INITIAL_FORM);

      // Reset to idle after 5 seconds so they can send again
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  const isDisabled = formStatus === 'submitting' || formStatus === 'success';

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative w-full rounded-2xl flex flex-col bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-lg"
    >
      {/* Glow effects layer — contained with overflow clip */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[var(--color-accent)] opacity-[0.06] blur-[100px] translate-x-1/4 -translate-y-1/4 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-accent-green)] opacity-[0.04] blur-[80px] -translate-x-1/4 translate-y-1/4 rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      {/* Content layer */}
      <div className="relative z-10 p-8 lg:p-12 flex flex-col">

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--color-text-primary)] font-medium px-1">{t.contact.fullName}</label>
            <input 
              type="text"
              value={formData.fullName}
              onChange={e => updateField('fullName', e.target.value)}
              placeholder={t.contact.fullNamePlaceholder}
              disabled={isDisabled}
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-4 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all focus:shadow-[0_0_15px_var(--color-glow)] disabled:opacity-50"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--color-text-primary)] font-medium px-1">{t.contact.phone}</label>
            <input 
              type="text"
              value={formData.phone}
              onChange={e => updateField('phone', e.target.value)}
              placeholder={t.contact.phonePlaceholder}
              disabled={isDisabled}
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-4 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all focus:shadow-[0_0_15px_var(--color-glow)] disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--color-text-primary)] font-medium px-1">{t.contact.email}</label>
            <input 
              type="email"
              value={formData.email}
              onChange={e => updateField('email', e.target.value)}
              placeholder={t.contact.emailPlaceholder}
              disabled={isDisabled}
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-4 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all focus:shadow-[0_0_15px_var(--color-glow)] disabled:opacity-50"
            />
          </div>

          {/* Service Needed — Custom Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-[var(--color-text-primary)] font-medium px-1">{t.contact.serviceNeeded}</label>
            <div className="relative" ref={dropdownRef}>
              {/* Trigger Button */}
              <button
                type="button"
                role="combobox"
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                aria-controls="service-listbox"
                aria-activedescendant={highlightedIndex >= 0 ? `service-option-${serviceOptions[highlightedIndex]?.value}` : undefined}
                disabled={isDisabled}
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  if (!isDropdownOpen) {
                    const idx = serviceOptions.findIndex(o => o.value === formData.service);
                    setHighlightedIndex(idx >= 0 ? idx : 0);
                  }
                }}
                onKeyDown={handleKeyDown}
                className={`
                  w-full flex items-center justify-between 
                  bg-[var(--color-input-bg)] border rounded-lg px-4 py-3.5 
                  text-left transition-all duration-200 focus:outline-none
                  disabled:opacity-50
                  ${isDropdownOpen 
                    ? 'border-[var(--color-accent)] shadow-[0_0_15px_var(--color-glow)]' 
                    : 'border-[var(--color-input-border)] hover:border-[var(--color-border-hover)]'
                  } 
                  ${formData.service ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}
                `}
              >
                <span className="block truncate text-[15px]">
                  {selectedLabel || t.contact.servicePlaceholder}
                </span>
                <ChevronDown 
                  className={`
                    w-5 h-5 shrink-0 transition-all duration-300
                    ${isDropdownOpen ? 'rotate-180 text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}
                  `}
                />
              </button>

              {/* Dropdown Panel — opens UPWARD to avoid textarea overlap */}
              <div 
                className={`
                  absolute bottom-[calc(100%+6px)] left-0 z-[100] w-full
                  bg-[var(--color-surface-elevated)] backdrop-blur-xl
                  border border-[var(--color-border)] rounded-xl
                  shadow-lg
                  transition-all duration-200 origin-bottom
                  ${isDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                  }
                `}
              >
                <ul 
                  ref={listRef}
                  id="service-listbox"
                  role="listbox" 
                  className="py-1.5 max-h-[240px] overflow-y-auto scrollbar-thin"
                >
                  {serviceOptions.map((option, idx) => {
                    const isSelected = formData.service === option.value;
                    const isHighlighted = highlightedIndex === idx;

                    return (
                      <li
                        key={option.value}
                        id={`service-option-${option.value}`}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        onClick={() => selectOption(option.value)}
                        className={`
                          mx-1.5 px-3 py-2.5 rounded-lg text-[15px] 
                          cursor-pointer transition-all duration-150
                          flex items-center justify-between
                          ${isHighlighted 
                            ? 'bg-[var(--color-surface-card)]' 
                            : 'bg-transparent'
                          }
                          ${isSelected 
                            ? 'text-[var(--color-accent)] font-medium' 
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                          }
                        `}
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 rtl:mr-auto ltr:ml-auto" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-2 w-full mb-8">
          <label className="text-[var(--color-text-primary)] font-medium px-1">{t.contact.message}</label>
          <div>
            <textarea 
              value={formData.message}
              onChange={e => updateField('message', e.target.value)}
              placeholder={t.contact.messagePlaceholder}
              maxLength={500}
              disabled={isDisabled}
              rows={5}
              className="w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg px-4 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none disabled:opacity-50"
            />
            <div className="text-right rtl:text-left mt-1 w-full text-[var(--color-text-muted)] text-[13px]">
              {t.contact.maxChars}
            </div>
          </div>
        </div>

        {/* Status Feedback */}
        {formStatus === 'success' && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg bg-[#12e399]/10 border border-[#12e399]/20">
            <CheckCircle2 className="w-5 h-5 text-[#12e399] shrink-0" />
            <p className="text-[#12e399] text-sm font-medium">
              {t.contact.successMessage ?? 'Your message has been sent successfully! We will get back to you within 24 hours.'}
            </p>
          </div>
        )}

        {formStatus === 'error' && errorMessage && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isDisabled}
          className="self-start px-8 py-3.5 bg-gradient-to-r from-[#2dc5f4] to-[#12e399] rounded-md text-[#08121e] font-semibold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(45,197,244,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {formStatus === 'submitting' && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {formStatus === 'success' 
            ? (t.contact.sent ?? 'Sent!')
            : t.contact.submit
          }
        </button>

      </div>
    </form>
  );
}
