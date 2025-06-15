import React from "react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="storeName">
              Store Name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your store name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Contact Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter contact email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="currency">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}