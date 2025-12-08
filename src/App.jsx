import React, { useState } from "react";
import "./App.css";

export default function AdaptiveCoachingEngine() {
  const [inputs, setInputs] = useState({
    energy: "medium",
    mood: "neutral",
    hunger: "moderate",
    sleep: "average",
    stress: "medium",
    progress: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const inputBase =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm";

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  // -----------------------------
  //  COACHING ENGINE
  // -----------------------------
  const generateCoaching = () => {
    const { energy, mood, hunger, sleep, stress, progress } = inputs;

    let score = 0;

    // energy
    if (energy === "low") score += 3;
    if (energy === "high") score -= 1;

    // mood
    if (mood === "down") score += 3;
    if (mood === "neutral") score += 1;

    // hunger / cravings
    if (hunger === "strong") score += 3;

    // sleep
    if (sleep === "poor") score += 4;
    if (sleep === "great") score -= 1;

    // stress
    if (stress === "high") score += 4;
    if (stress === "low") score -= 1;

    // classify
    let label = "";
    let zone = "";
    let coreMessage = "";

    if (score <= 2) {
      zone = "green";
      label = "Aligned Day";
      coreMessage =
        "Your inputs suggest you're in a good rhythm today. Keep leaning into routines that support you.";
    } else if (score <= 7) {
      zone = "yellow";
      label = "Needs Gentle Support";
      coreMessage =
        "There are a few pressure points showing up today. Nothing alarming — but small adjustments will help.";
    } else {
      zone = "red";
      label = "High-Tension Day";
      coreMessage =
        "Your system is carrying a lot right now. Today calls for simplicity, grounding, and low-pressure steps.";
    }

    // Personalized tips
    const tips = [];

    if (energy === "low")
      tips.push("Pick one energizing action: sunlight walk, hydration, or protein snack.");
    if (stress === "high")
      tips.push("Micro-breaks every 90 minutes can dramatically reduce overwhelm.");
    if (sleep === "poor")
      tips.push("Prioritize an earlier wind-down tonight — even 20 minutes helps.");
    if (hunger === "strong")
      tips.push("Add fiber + protein at your next meal to steady cravings.");
    if (mood === "down")
      tips.push("Reach for a tiny mood lifter: music, a message to a friend, or stepping outside.");
    if (!progress.trim())
      tips.push("Take 10 seconds to acknowledge *one small win* from today — it shifts mindset.");
    else tips.push(`Build on your win: “${progress}” — repeat a tiny version of it today.`);

    if (tips.length === 0) {
      tips.push("You're in a stable zone — just keep doing what’s already working.");
    }

    setResult({ zone, label, coreMessage, tips });
  };

  const badgeClass = {
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-center mb-2">
          Adaptive Coaching Engine
        </h2>
        <p className="text-gray-500 text-xs text-center mb-5">
          Real-time coaching based on your current state.  
          Not a diagnosis — just supportive guidance.
        </p>

        {/* Input Form */}
        <div className="space-y-4 mb-6">
          {/* Energy */}
          <div>
            <label className="text-sm font-medium">Energy Level</label>
            <select
              className={inputBase}
              value={inputs.energy}
              onChange={(e) => handleChange("energy", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Mood */}
          <div>
            <label className="text-sm font-medium">Mood</label>
            <select
              className={inputBase}
              value={inputs.mood}
              onChange={(e) => handleChange("mood", e.target.value)}
            >
              <option value="down">Down / Flat</option>
              <option value="neutral">Neutral</option>
              <option value="good">Good</option>
            </select>
          </div>

          {/* Hunger */}
          <div>
            <label className="text-sm font-medium">Hunger / Cravings</label>
            <select
              className={inputBase}
              value={inputs.hunger}
              onChange={(e) => handleChange("hunger", e.target.value)}
            >
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="strong">Strong</option>
            </select>
          </div>

          {/* Sleep */}
          <div>
            <label className="text-sm font-medium">Sleep Quality</label>
            <select
              className={inputBase}
              value={inputs.sleep}
              onChange={(e) => handleChange("sleep", e.target.value)}
            >
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="great">Great</option>
            </select>
          </div>

          {/* Stress */}
          <div>
            <label className="text-sm font-medium">Stress Level</label>
            <select
              className={inputBase}
              value={inputs.stress}
              onChange={(e) => handleChange("stress", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Progress */}
          <div>
            <label className="text-sm font-medium">
              A win or challenge today (optional)
            </label>
            <input
              className={inputBase}
              placeholder="e.g., Hit my protein goal"
              value={inputs.progress}
              onChange={(e) => handleChange("progress", e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={generateCoaching}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm"
          >
            Get Coaching
          </button>

          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </p>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Your Coaching Snapshot</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeClass[result.zone]}`}
              >
                {result.label}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-3">{result.coreMessage}</p>

            <h4 className="text-sm font-semibold mb-1">
              What to focus on now:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <hr className="my-3" />

            <p className="text-[11px] text-gray-400">
              This tool adapts coaching to your current state — but it doesn’t
              replace professional help for mental or physical health concerns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
