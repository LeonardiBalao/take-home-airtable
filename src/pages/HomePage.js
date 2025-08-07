import React from "react";
import { Header, Footer, StatisticsGrid } from "../components/index.js";
import Timeline from "../Timeline.js";

const HomePage = ({ timelineItems }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-4 sm:pt-8">
        {/* Page Title Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Project Timeline Overview
            </h2>
          </div>
        </div>

        {/* Statistics Cards */}
        <StatisticsGrid timelineItems={timelineItems} />

        {/* Timeline Section */}
        <div className="bg-white">
          <Timeline items={timelineItems} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
