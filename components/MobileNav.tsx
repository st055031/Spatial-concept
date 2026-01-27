
import React from 'react';
import { Topic, TopicInfo } from '../types';
import { Menu } from 'lucide-react';

interface MobileNavProps {
  topics: TopicInfo[];
  activeTopic: Topic;
  onSelect: (topic: Topic) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ topics, activeTopic, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      {/* Bottom Floating Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 px-6 py-3 items-center gap-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-indigo-600 text-white rounded-full shadow-md"
        >
          <Menu size={20} />
        </button>
        <div className="h-4 w-[1px] bg-slate-300"></div>
        <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
          {topics.find(t => t.id === activeTopic)?.title}
        </span>
      </div>

      {/* Fullscreen Overlay Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-end"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-t-3xl p-6 space-y-2 animate-in slide-in-from-bottom duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-slate-800">切換主題</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400">關閉</button>
            </div>
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelect(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-4 rounded-xl text-base font-medium transition-all ${
                  activeTopic === t.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-600 bg-slate-50'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
