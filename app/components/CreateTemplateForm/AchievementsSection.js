"use client"
import React from "react";

const AchievementsSection = ({ achievements, handleChange, addAchievement }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Achievements</h2>
      {achievements.map((achievement, index) => (
        <div key={index} className="space-y-3 mb-4 p-3 border border-gray-200 rounded-md">
          <div>
            <label htmlFor={`achievement-name-${index}`} className="block text-sm font-medium text-gray-700">
              Achievement
            </label>
            <input
              type="text"
              id={`achievement-name-${index}`}
              name="name"
              value={achievement.name}
              onChange={(e) => handleChange(e, "achievements", index)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addAchievement}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Achievement
      </button>
    </div>
  );
};

export default AchievementsSection;