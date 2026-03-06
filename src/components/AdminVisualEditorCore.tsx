import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Image as ImageIcon, 
  Type, 
  Layout, 
  Palette, 
  Save, 
  Upload, 
  X, 
  Eye, 
  EyeOff,
  RefreshCw,
  Move,
  Maximize,
  ChevronRight,
  Zap,
  Sparkles
} from 'lucide-react';
import { useEditor } from '../context/EditorContext';
import { createPortal } from 'react-dom';

/**
 * ADMIN_VISUAL_EDITOR_CORE
 * System-level Visual Edit Engine
 * Mounts directly to DOM Root when admin conditions are met.
 */
export const ADMIN_VISUAL_EDITOR_CORE: React.FC = () => {
  const { 
    isEditMode, 
    setIsEditMode, 
    saveDraft, 
    publish, 
    isAdmin, 
    selectedElement, 
    setSelectedElement,
    siteData,
    setSiteData 
  } = useEditor();

  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');

  // Immediate mount check - No async waiting for UI
  if (!isAdmin) return null;

  const handleCloseInspector = () => setSelectedElement(null);

  const editorUI = (
    <div id="ADMIN_VISUAL_EDITOR_CORE_ROOT" className="fixed inset-0 pointer-events-none z-[9999]">
      {/* System Toolbar - Always Visible for Admin */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 bg-black/90 backdrop-blur-2xl border-2 border-gold/30 p-2 rounded-2xl shadow-[0_0_50px_rgba(201,162,77,0.3)]"
        >
          <div className="px-4 py-2 border-r border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] leading-none">Core Engine</span>
              <span className="text-xs font-bold text-white uppercase tracking-tighter">VUA APP EDITOR</span>
            </div>
          </div>

          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isEditMode ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            {isEditMode ? <EyeOff size={16} /> : <Eye size={16} />}
            {isEditMode ? 'EXIT EDIT MODE' : 'ENTER EDIT MODE'}
          </button>
          
          {isEditMode && (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-px h-6 bg-white/10 mx-2" />
                <button 
                  onClick={saveDraft}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Save size={16} /> SAVE DRAFT
                </button>
                <button 
                  onClick={publish}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <RefreshCw size={16} /> PUBLISH LIVE
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Inspector Panel - Real-time Control */}
      <AnimatePresence>
        {isEditMode && selectedElement && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-24 right-6 bottom-24 w-[400px] bg-black/95 backdrop-blur-3xl border-2 border-gold/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col overflow-hidden"
          >
            {/* Panel Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gold/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold/20 rounded-2xl border border-gold/30">
                  <Settings className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter">Inspector</h3>
                  <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Active Element: {selectedElement}</p>
                </div>
              </div>
              <button onClick={handleCloseInspector} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Panel Tabs */}
            <div className="flex p-2 bg-white/5 border-b border-white/10">
              {[
                { id: 'content', label: 'Content', icon: Type },
                { id: 'style', label: 'Style', icon: Palette },
                { id: 'layout', label: 'Layout', icon: Layout }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-gold text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Real-time Controls */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {activeTab === 'content' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] text-gold font-black uppercase tracking-widest flex items-center gap-2">
                      <Type size={12} /> Text Content
                    </label>
                    <textarea 
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-gold min-h-[150px] transition-colors"
                      placeholder="Enter content..."
                      defaultValue={selectedElement.includes('title') ? 'GIÚP CHỦ DOANH NGHIỆP X3 DOANH SỐ' : ''}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] text-gold font-black uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={12} /> Media Engine
                    </label>
                    <div className="border-2 border-dashed border-gold/20 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-6 hover:border-gold/50 transition-all cursor-pointer group bg-gold/5">
                      <div className="p-5 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors shadow-lg">
                        <Upload className="text-gold" size={40} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white font-black uppercase tracking-widest mb-1">Upload New Media</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Image or Video (Max 50MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'style' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Primary Color</label>
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border-2 border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-gold border-2 border-white/20 shadow-lg" />
                        <input type="text" value="#C9A24D" className="bg-transparent text-xs text-white w-full font-mono outline-none" readOnly />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Corner Radius</label>
                      <div className="flex items-center gap-4">
                        <input type="range" className="w-full accent-gold h-2 bg-white/10 rounded-full appearance-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Visual Effects</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['None', 'Glow', 'Strong'].map((s) => (
                        <button key={s} className="py-3 bg-white/5 border-2 border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-gold hover:text-gold transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'layout' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Alignment Engine</label>
                    <div className="flex bg-white/5 p-2 rounded-2xl border-2 border-white/10">
                      {['Left', 'Center', 'Right'].map((a) => (
                        <button key={a} className="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Padding (px)</label>
                      <input type="number" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold" placeholder="24" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Margin (px)</label>
                      <input type="number" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-gold" placeholder="0" />
                    </div>
                  </div>

                  <div className="p-6 bg-gold/5 border-2 border-gold/20 rounded-3xl space-y-4">
                    <div className="flex items-center gap-3">
                      <Move className="text-gold" size={20} />
                      <span className="text-xs font-black text-white uppercase tracking-widest">Section Controls</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-white">Move Up</button>
                      <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-white">Move Down</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="p-8 border-t border-white/10 bg-white/5 flex gap-4">
              <button 
                onClick={handleCloseInspector}
                className="flex-1 py-4 bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all"
              >
                CANCEL
              </button>
              <button className="flex-1 py-4 bg-gold text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-gold-light transition-all shadow-xl shadow-gold/30 flex items-center justify-center gap-2">
                APPLY CHANGES <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Indicator */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-10 left-10 pointer-events-none"
          >
            <div className="flex items-center gap-4 bg-gold px-6 py-3 rounded-full shadow-[0_0_30px_rgba(201,162,77,0.5)]">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
              <span className="text-black font-black text-xs uppercase tracking-[0.2em]">Visual Edit Mode Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(editorUI, document.body);
};
