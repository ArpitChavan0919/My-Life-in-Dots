
import React, { useState } from 'react';

interface HomePageProps {
  onSetDob: (dob: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSetDob }) => {
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onSetDob(date);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
          My Life in Dots
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          See your life visualized in time.
        </p>
        <form onSubmit={handleSubmit} className="mt-10">
          <label htmlFor="dob" className="sr-only">Enter your Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
            className="w-full px-4 py-3 text-lg bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-xl outline-none transition-colors"
            style={{ colorScheme: 'dark' }}
          />
          <button
            type="submit"
            className="mt-6 w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-3 px-6 rounded-xl text-lg hover:opacity-80 transition-opacity transform active:scale-95"
          >
            Show My Life
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
