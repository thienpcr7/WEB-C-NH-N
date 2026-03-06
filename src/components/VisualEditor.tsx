import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Type, 
  Layout, 
  Palette, 
  Save, 
  Upload, 
  Trash2, 
  Copy, 
  ChevronRight, 
  X, 
  Monitor, 
  Tablet, 
  Smartphone,
  Eye,
  EyeOff,
  Check,
  RefreshCw,
  Lock,
  Unlock,
  Move,
  Maximize,
  Minimize
} from 'lucide-react';
import { useEditor } from '../context/EditorContext';

export const EditorToolbar: React.FC = () => {
  const { isEditMode, setIsEditMode, saveDraft, publish, isAdmin } = useEditor();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
      <button 
        onClick={() => setIsEditMode(!isEditMode)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isEditMode ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
      >
        {isEditMode ? <EyeOff size={16} /> : <Eye size={16} />}
        {isEditMode ? 'Tắt Chế Độ Sửa' : 'Bật Chế Độ Sửa'}
      </button>
      
      {isEditMode && (
        <>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <button 
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
          >
            <Save size={16} /> Lưu Nháp
          </button>
          <button 
            onClick={publish}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <RefreshCw size={16} /> Xuất Bản
          </button>
        </>
      )}
    </div>
  );
};

export const EditableText: React.FC<{ 
  id: string; 
  value: string; 
  onChange: (val: string) => void; 
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}> = ({ id, value, onChange, className = '', as: Tag = 'p' }) => {
  const { isEditMode, selectedElement, setSelectedElement } = useEditor();
  const isSelected = selectedElement === id;

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <div 
      className={`relative group cursor-text ${isSelected ? 'ring-2 ring-gold ring-offset-4 ring-offset-black rounded-lg' : 'hover:ring-1 hover:ring-gold/50 rounded-lg'}`}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id);
      }}
    >
      {isSelected && (
        <div className="absolute -top-8 left-0 bg-gold text-black text-[10px] font-black uppercase px-2 py-1 rounded-t-md flex items-center gap-1">
          <Type size={10} /> Text Editor
        </div>
      )}
      <Tag 
        contentEditable 
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.currentTarget.textContent || '')}
        className={`${className} outline-none focus:bg-white/5 transition-colors`}
      >
        {value}
      </Tag>
    </div>
  );
};

export const EditableImage: React.FC<{
  id: string;
  src: string;
  onChange: (src: string) => void;
  className?: string;
  alt?: string;
}> = ({ id, src, onChange, className = '', alt = '' }) => {
  const { isEditMode, selectedElement, setSelectedElement } = useEditor();
  const isSelected = selectedElement === id;

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} referrerPolicy="no-referrer" />;
  }

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden ${isSelected ? 'ring-4 ring-gold ring-offset-4 ring-offset-black rounded-2xl' : 'hover:ring-2 hover:ring-gold/50 rounded-2xl'}`}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(id);
      }}
    >
      {isSelected && (
        <div className="absolute top-4 left-4 z-20 bg-gold text-black text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-xl">
          <ImageIcon size={10} /> Image Editor
        </div>
      )}
      <img src={src} alt={alt} className={`${className} transition-transform group-hover:scale-105`} referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-gold text-black p-3 rounded-full shadow-2xl">
          <Settings size={24} />
        </div>
      </div>
    </div>
  );
};

export const InspectorPanel: React.FC = () => {
  const { isEditMode, selectedElement, setSelectedElement, siteData, setSiteData } = useEditor();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');

  if (!isEditMode || !selectedElement) return null;

  const handleClose = () => setSelectedElement(null);

  return (
    <motion.div 
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed top-24 right-6 bottom-24 w-96 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[200] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold/20 rounded-xl border border-gold/30">
            <Settings className="text-gold" size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Inspector</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ID: {selectedElement}</p>
          </div>
        </div>
        <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-2 bg-white/5 border-b border-white/10">
        {[
          { id: 'content', label: 'Content', icon: Type },
          { id: 'style', label: 'Style', icon: Palette },
          { id: 'layout', label: 'Layout', icon: Layout }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-gold text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Thay đổi nội dung</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gold min-h-[120px]"
                placeholder="Nhập nội dung..."
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Upload Media</label>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-gold/50 transition-colors cursor-pointer group">
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/10 transition-colors">
                  <Upload className="text-gray-500 group-hover:text-gold" size={32} />
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Kéo thả hoặc click để tải lên</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Màu chữ</label>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-gold border border-white/20" />
                  <input type="text" value="#c9a24d" className="bg-transparent text-xs text-white w-full outline-none" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Bo góc</label>
                <input type="range" className="w-full accent-gold" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Hiệu ứng đổ bóng</label>
              <div className="grid grid-cols-3 gap-2">
                {['None', 'Soft', 'Strong'].map((s) => (
                  <button key={s} className="py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 hover:border-gold/50">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Căn chỉnh</label>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {['Left', 'Center', 'Right'].map((a) => (
                  <button key={a} className="flex-1 py-2 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white">
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Padding</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none" placeholder="px" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Margin</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none" placeholder="px" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
        <button className="flex-1 py-3 bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all">
          Hủy Bỏ
        </button>
        <button className="flex-1 py-3 bg-gold text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20">
          Áp Dụng
        </button>
      </div>
    </motion.div>
  );
};
