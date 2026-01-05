import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function CustomSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // close on outside click + Escape
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const selectedIndex = Math.max(0, options.indexOf(value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  // keep activeIndex in sync with value
  useEffect(() => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
  }, [value, options]);

  const commit = (idx) => {
    const val = options[idx];
    if (!val) return;
    onChange(val);
    setOpen(false);
  };

  const onButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.max(0, i - 1));
    }
  };

  const onListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commit(activeIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className='relative'>
      <label className='block text-sm font-medium mb-1'>{label}</label>

      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        className='w-full rounded-lg border border-slate-300 bg-white px-3 py-[10px] text-sm text-left flex items-center justify-between outline-none focus:border-b-3 focus:border-b-[#5cff7f] transition'
      >
        <span className='capitalize text-slate-900'>{value}</span>

        <svg
          className={`h-4 w-4 text-slate-500 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {open && (
        <ul
          role='listbox'
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className='absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden'
        >
          {options.map((o, idx) => {
            const isSelected = o === value;
            const isActive = idx === activeIndex;

            return (
              <li
                key={o}
                role='option'
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => commit(idx)}
                className={`px-3 py-2 text-sm cursor-pointer capitalize flex items-center justify-between transition
                  ${isActive ? 'bg-slate-100' : 'bg-white'}
                  ${
                    isSelected
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-700'
                  }
                `}
              >
                <span>{o}</span>
                {isSelected && (
                  <svg
                    className='h-4 w-4 text-slate-700'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.704 5.29a1 1 0 010 1.415l-7.07 7.07a1 1 0 01-1.414 0l-3.536-3.535a1 1 0 011.414-1.415l2.829 2.83 6.363-6.364a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AdaptiveCoachingEngine() {
  const [inputs, setInputs] = useState({
    energy: 'medium',
    mood: 'neutral',
    hunger: 'moderate',
    sleep: 'average',
    stress: 'medium',
    progress: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const generateCoaching = () => {
    const { energy, mood, hunger, sleep, stress, progress } = inputs;

    let score = 0;
    if (energy === 'low') score += 3;
    if (mood === 'down') score += 3;
    if (hunger === 'strong') score += 3;
    if (sleep === 'poor') score += 4;
    if (stress === 'high') score += 4;

    let zone, label, coreMessage;

    if (score <= 2) {
      zone = 'green';
      label = 'Aligned Day';
      coreMessage =
        "Your inputs suggest you're in a good rhythm today. Keep leaning into routines that support you.";
    } else if (score <= 7) {
      zone = 'yellow';
      label = 'Needs Gentle Support';
      coreMessage =
        'There are a few pressure points showing up today. Nothing alarming — but small adjustments will help.';
    } else {
      zone = 'red';
      label = 'High-Tension Day';
      coreMessage =
        'Your system is carrying a lot right now. Today calls for simplicity, grounding, and low-pressure steps.';
    }

    const tips = [];
    if (energy === 'low') tips.push('Get sunlight, hydrate, or add protein.');
    if (stress === 'high') tips.push('Take micro-breaks every 90 minutes.');
    if (sleep === 'poor') tips.push('Wind down earlier tonight.');
    if (hunger === 'strong')
      tips.push('Add fiber + protein to your next meal.');

    if (!progress.trim()) tips.push('Acknowledge one small win from today.');
    else tips.push(`Build on your win: “${progress}”.`);

    setResult({ zone, label, coreMessage, tips });
  };

  const badgeStyles = {
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    red: 'bg-rose-100 text-rose-700',
  };

  return (
    <section className='bg-slate-50 py-16'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* LEFT TEXT */}
          <div className='max-w-xl mx-auto lg:mx-0 text-center lg:text-left'>
            <p className='inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600'>
              Commit • Burn • Conquer
            </p>

            <h2 className='mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
              FitCal Coaching
            </h2>

            <p className='mt-4 text-slate-600 text-lg leading-relaxed max-w-xl'>
              FitCal gives you instant fitness and nutrition guidance based on
              how you feel right now — your energy, mood, sleep, stress, and
              cravings. Instead of rigid plans or tracking everything, FitCal
              adapts in real time to help you make better choices, stay
              consistent, and move forward at your own pace.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start'>
              <a
                href='mailto:tanveerok355@gmail.com'
                className='inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold border border-slate-300 text-white hover:text-slate-900 hover:bg-white transition'
              >
                Email Support
              </a>
              <a
                href='#coaching-tool'
                className='inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-900 hover:text-white duration-300 transition'
              >
                Use Coaching Tool
              </a>
            </div>

            <p className='mt-4 text-sm text-slate-500'>
              Typical reply time: within 24 hours • Email:
              tanveerok355@gmail.com
            </p>
          </div>

          {/* RIGHT TOOL */}
          <div id='coaching-tool' className='flex justify-center'>
            <div className='w-full max-w-xl h-fit bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
              <h2 className='text-2xl font-semibold text-center tracking-tight'>
                Adaptive Coaching Engine
              </h2>
              <p className='text-center text-sm text-slate-500 mt-1 mb-6'>
                Real-time guidance based on how you're feeling today.
              </p>

              <div className='space-y-4'>
                <CustomSelect
                  label='Energy Level'
                  value={inputs.energy}
                  options={['low', 'medium', 'high']}
                  onChange={(val) => handleChange('energy', val)}
                />
                <CustomSelect
                  label='Mood'
                  value={inputs.mood}
                  options={['down', 'neutral', 'good']}
                  onChange={(val) => handleChange('mood', val)}
                />
                <CustomSelect
                  label='Hunger / Cravings'
                  value={inputs.hunger}
                  options={['light', 'moderate', 'strong']}
                  onChange={(val) => handleChange('hunger', val)}
                />
                <CustomSelect
                  label='Sleep Quality'
                  value={inputs.sleep}
                  options={['poor', 'average', 'great']}
                  onChange={(val) => handleChange('sleep', val)}
                />
                <CustomSelect
                  label='Stress Level'
                  value={inputs.stress}
                  options={['low', 'medium', 'high']}
                  onChange={(val) => handleChange('stress', val)}
                />

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    A win or challenge today (optional)
                  </label>
                  <input
                    className='w-full rounded-lg border border-slate-300 bg-white px-3 py-[10px] text-sm outline-none focus:border-b-3 focus:border-b-[#5cff7f]'
                    placeholder='e.g. Hit my protein goal'
                    value={inputs.progress}
                    onChange={(e) => handleChange('progress', e.target.value)}
                  />
                </div>

                <button
                  onClick={generateCoaching}
                  className='w-full rounded-full bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-white hover:text-black duration-300 border border-slate-900 cursor-pointer transition'
                >
                  Get Coaching
                </button>
              </div>

              {result && (
                <div className='mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-semibold'>Your Coaching Snapshot</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        badgeStyles[result.zone]
                      }`}
                    >
                      {result.label}
                    </span>
                  </div>

                  <p className='text-sm text-slate-700 mb-3'>
                    {result.coreMessage}
                  </p>

                  <p className='text-sm font-medium mb-1'>
                    What to focus on now:
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-sm text-slate-700'>
                    {result.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>

                  <p className='mt-3 text-[11px] text-slate-400'>
                    This tool provides supportive guidance, not medical advice.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
