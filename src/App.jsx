import React, { useState } from 'react';
import './App.css';

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

  const inputClass =
    'w-full rounded-xl border border-slate-300 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 appearance-none bg-white';

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
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
              Support • Coaching • Contact
            </p>

            <h2 className='mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
              Contact & Instant Coaching
            </h2>

            <p className='mt-4 text-slate-600 text-lg leading-relaxed'>
              Have a question or need support? Send us a message and we’ll get
              back within 24 hours. If you want guidance right now, use the
              Adaptive Coaching Engine to get suggestions based on your current
              energy, mood, sleep, stress, and cravings.
            </p>

            <div className='mt-6 grid gap-3 text-sm md:text-[16px] text-slate-600'>
              <div className='flex items-center justify-center lg:justify-start gap-2'>
                <span className='h-1.5 w-1.5 rounded-full bg-slate-900/60' />
                Instant, personalized suggestions
              </div>
              <div className='flex items-center justify-center lg:justify-start gap-2'>
                <span className='h-1.5 w-1.5 rounded-full bg-slate-900/60' />
                Private — nothing is stored
              </div>
              <div className='flex items-center justify-center lg:justify-start gap-2'>
                <span className='h-1.5 w-1.5 rounded-full bg-slate-900/60' />
                Supportive guidance, not medical advice
              </div>
            </div>

            <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start'>
              <a
                href='mailto:tanveerok355@gmail.com'
                className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold border border-slate-300 text-white hover:text-slate-900 hover:bg-white transition'
              >
                Email Support
              </a>
              <a
                href='#coaching-tool'
                className='inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-900 hover:text-white duration-300 transition'
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
                {[
                  ['Energy Level', 'energy', ['low', 'medium', 'high']],
                  ['Mood', 'mood', ['down', 'neutral', 'good']],
                  [
                    'Hunger / Cravings',
                    'hunger',
                    ['light', 'moderate', 'strong'],
                  ],
                  ['Sleep Quality', 'sleep', ['poor', 'average', 'great']],
                  ['Stress Level', 'stress', ['low', 'medium', 'high']],
                ].map(([label, key, options]) => (
                  <div key={key}>
                    <label className='block text-sm font-medium mb-1'>
                      {label}
                    </label>

                    {/* select wrapper to position arrow nicely */}
                    <div className='relative'>
                      <select
                        className={inputClass}
                        value={inputs[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                      >
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o.charAt(0).toUpperCase() + o.slice(1)}
                          </option>
                        ))}
                      </select>

                      {/* custom arrow */}
                      <svg
                        className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                ))}

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    A win or challenge today (optional)
                  </label>
                  <input
                    className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400'
                    placeholder='e.g. Hit my protein goal'
                    value={inputs.progress}
                    onChange={(e) => handleChange('progress', e.target.value)}
                  />
                </div>

                <button
                  onClick={generateCoaching}
                  className='w-full rounded-xl bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-white hover:text-black duration-300 border border-slate-900 cursor-pointer transition'
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
