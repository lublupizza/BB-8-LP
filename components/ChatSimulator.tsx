import React, { useState, useEffect, useRef } from 'react';
import { BotScenario, VkButton } from '../types';
import VkButtonRender from './VkButtonRender';
import { Send, User, Bot, Menu } from 'lucide-react';

interface Props {
  activeScenario: BotScenario;
}

const ChatSimulator: React.FC<Props> = ({ activeScenario }) => {
  const [history, setHistory] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset history when scenario changes
  useEffect(() => {
    setHistory([{ sender: 'bot', text: activeScenario.botMessage }]);
  }, [activeScenario]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleButtonClick = (button: VkButton) => {
    const label = button.action.label;
    const payloadStr = button.action.payload || '{}';
    
    setHistory((prev) => [...prev, { sender: 'user', text: label }]);
    
    // Parse payload to simulate specific backend logic
    let responseText = '✅ (Симуляция) Бот принял команду. В реальном боте здесь сработает переход к следующему шагу или вызов оператора.';
    
    try {
      const payload = JSON.parse(payloadStr);
      
      if (payload.cmd === 'call_phone') {
        responseText = '📞 Наш телефон: 600-500. \n\nМы ждем вашего звонка! 🍕';
      } else if (payload.cmd === 'call_operator_order') {
        responseText = '🔔 (Backend Log) \nУведомление отправлено в Telegram администраторам: \n"🔥 Новый запрос на вызов оператора (Заказ)!"\n\nБот: Оператор скоро подключится к чату.';
      } else if (payload.cmd === 'menu') {
        responseText = '🔄 (Симуляция) Переход в сценарий "Меню"...';
      }
    } catch (e) {
      console.error('Error parsing payload', e);
    }

    // Simulate delay
    setTimeout(() => {
      setHistory((prev) => [
        ...prev, 
        { 
          sender: 'bot', 
          text: responseText
        }
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-sm mx-auto bg-[#edeef0] border-4 border-gray-800 rounded-[30px] overflow-hidden shadow-2xl relative">
      {/* Phone Notch/Status Bar Mock */}
      <div className="bg-gray-800 text-white text-[10px] py-1 px-4 flex justify-between items-center z-10">
        <span>12:30</span>
        <div className="w-16 h-4 bg-black rounded-b-lg absolute left-1/2 -translate-x-1/2 top-0"></div>
        <span>LTE 100%</span>
      </div>

      {/* Header */}
      <div className="bg-white p-3 border-b flex items-center gap-3 shadow-sm z-10">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
          <Bot size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800">ЛюблюPizza ❤️</h3>
          <p className="text-xs text-gray-500">бот</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        <div className="text-center text-xs text-gray-400 my-2">Сегодня</div>
        
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#cce4ff] text-black rounded-br-none'
                  : 'bg-white text-black rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Keyboard Area */}
      <div className="bg-[#ebedf0] p-2 border-t border-gray-300 pb-6">
        <div className="space-y-2">
            {activeScenario.keyboard.buttons.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map((btn, btnIdx) => (
                  <VkButtonRender 
                    key={btnIdx} 
                    button={btn} 
                    onClick={() => handleButtonClick(btn)} 
                  />
                ))}
              </div>
            ))}
        </div>
      </div>

      {/* Input Placeholder (Visual only) */}
      <div className="bg-white p-2 flex items-center gap-2 border-t">
         <div className="p-1.5 text-gray-400">
             <Menu size={24} />
         </div>
         <div className="flex-1 bg-gray-100 rounded-full h-8 px-3 flex items-center text-gray-400 text-sm">
             Сообщение...
         </div>
         <div className="p-1.5 text-[#5181b8]">
             <Send size={24} />
         </div>
      </div>
    </div>
  );
};

export default ChatSimulator;