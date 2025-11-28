import React from 'react';
import { BotScenario } from '../types';
import { Copy } from 'lucide-react';

interface Props {
  scenario: BotScenario;
}

const SpecificationView: React.FC<Props> = ({ scenario }) => {
  const jsonString = JSON.stringify(scenario.keyboard, null, 2);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('JSON скопирован в буфер обмена!');
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-2">📄 Текст сообщения</h3>
        <p className="text-sm text-gray-500 mb-2">Это сообщение отправляется пользователю:</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-gray-800 whitespace-pre-wrap font-sans">
          {scenario.botMessage}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative group">
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-lg font-bold text-gray-800">⌨️ JSON Клавиатуры (VK API)</h3>
                <p className="text-sm text-gray-500">Формат для поля <code>keyboard</code> метода <code>messages.send</code>.</p>
            </div>
            <button 
                onClick={() => copyToClipboard(jsonString)}
                className="flex items-center gap-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-md transition-colors"
            >
                <Copy size={14} />
                Копировать
            </button>
        </div>
        
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-xs leading-5 font-mono">
          <code>{jsonString}</code>
        </pre>
      </div>
      
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 text-sm text-yellow-800">
        <strong>💡 Совет:</strong> Убедитесь, что <code>payload</code> в кнопках содержит нужные данные для вашего бэкенда, чтобы правильно обработать нажатие.
      </div>
    </div>
  );
};

export default SpecificationView;