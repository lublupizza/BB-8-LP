import React, { useState } from 'react';
import { SCENARIOS } from './constants';
import ChatSimulator from './components/ChatSimulator';
import SpecificationView from './components/SpecificationView';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { MessageSquare, Code, PieChart, Heart } from 'lucide-react';

enum Tab {
  SIMULATOR = 'simulator',
  ANALYTICS = 'analytics'
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SIMULATOR);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);

  const activeScenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-gray-900 bg-gray-50">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-xl text-red-600">
            <div className="bg-red-600 text-white p-1.5 rounded-lg">
                <Heart size={20} fill="white" />
            </div>
            ЛюблюPizza
          </div>
          <p className="text-xs text-gray-400 mt-1 pl-1">Bot Designer & Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab(Tab.SIMULATOR)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === Tab.SIMULATOR ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={18} />
            Сценарии и JSON
          </button>
          <button
            onClick={() => setActiveTab(Tab.ANALYTICS)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === Tab.ANALYTICS ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PieChart size={18} />
            Аналитика и Данные
          </button>
        </nav>

        {activeTab === Tab.SIMULATOR && (
            <div className="p-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Сценарии</h3>
                <div className="space-y-1 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
                    {SCENARIOS.map((scenario) => (
                        <button
                            key={scenario.id}
                            onClick={() => setSelectedScenarioId(scenario.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors truncate ${
                                selectedScenarioId === scenario.id 
                                ? 'bg-gray-800 text-white' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {scenario.title}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen bg-gray-50">
        {activeTab === Tab.SIMULATOR ? (
            <div className="flex flex-col xl:flex-row h-full">
                {/* Center: Simulator */}
                <div className="flex-1 p-8 flex items-center justify-center bg-gray-100 border-r border-gray-200">
                    <ChatSimulator activeScenario={activeScenario} />
                </div>
                
                {/* Right: Specifications */}
                <div className="w-full xl:w-[500px] p-6 bg-white overflow-y-auto">
                    <div className="mb-6 pb-4 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">{activeScenario.title}</h2>
                        <p className="text-gray-500 mt-1">{activeScenario.description}</p>
                    </div>
                    <SpecificationView scenario={activeScenario} />
                </div>
            </div>
        ) : (
            <div className="p-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
                    <p className="text-gray-500 mt-1">Аналитика использования бота и состояние базы данных.</p>
                </div>
                <AnalyticsDashboard />
            </div>
        )}
      </main>
    </div>
  );
}

export default App;