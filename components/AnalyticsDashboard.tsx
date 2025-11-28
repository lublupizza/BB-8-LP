import React from 'react';
import { USER_STATS_DATA, NO_ORDER_REASONS } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Users, ShoppingBag, AlertTriangle, TrendingUp } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={20}/></div>
                <span className="text-sm text-gray-500">Всего пользователей</span>
            </div>
            <div className="text-2xl font-bold">1,245</div>
            <div className="text-xs text-green-600 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +12% за неделю</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg"><ShoppingBag size={20}/></div>
                <span className="text-sm text-gray-500">Конверсия в заказ</span>
            </div>
            <div className="text-2xl font-bold">28.5%</div>
            <div className="text-xs text-gray-400 mt-1">Из просмотра меню</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Users size={20}/></div>
                <span className="text-sm text-gray-500">Подписчиков рассылки</span>
            </div>
            <div className="text-2xl font-bold">890</div>
            <div className="text-xs text-gray-400 mt-1">71% от базы</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><AlertTriangle size={20}/></div>
                <span className="text-sm text-gray-500">Обращений (жалоб)</span>
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-green-600 mt-1">Низкий уровень</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Динамика новых пользователей</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={USER_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="newUsers" name="Новые" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" name="Заказы" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reasons Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Почему не сделали заказ?</h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={NO_ORDER_REASONS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="reason"
                    label
                  >
                    {NO_ORDER_REASONS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Database Schema Guide */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Архитектура базы данных (Схема)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-purple-600 mb-2">users</h4>
                <ul className="space-y-1 font-mono text-gray-600">
                    <li>id: SERIAL (PK)</li>
                    <li>vk_id: BIGINT (Unique)</li>
                    <li>first_name: VARCHAR</li>
                    <li>is_subscribed: BOOLEAN</li>
                    <li>created_at: TIMESTAMP</li>
                    <li>last_interaction: TIMESTAMP</li>
                </ul>
            </div>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-blue-600 mb-2">events</h4>
                <ul className="space-y-1 font-mono text-gray-600">
                    <li>id: UUID (PK)</li>
                    <li>user_id: FK -> users</li>
                    <li>event_type: VARCHAR (open_menu, order...)</li>
                    <li>payload: JSONB (details)</li>
                    <li>created_at: TIMESTAMP</li>
                </ul>
            </div>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-orange-600 mb-2">broadcasts</h4>
                <ul className="space-y-1 font-mono text-gray-600">
                    <li>id: SERIAL (PK)</li>
                    <li>title: VARCHAR</li>
                    <li>message_text: TEXT</li>
                    <li>sent_count: INT</li>
                    <li>clicked_count: INT</li>
                    <li>sent_at: TIMESTAMP</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;