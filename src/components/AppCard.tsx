import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { AppItem } from '../constants';

interface AppCardProps {
  app: AppItem;
  onBuy: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onBuy }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card rounded-2xl overflow-hidden group relative"
    >
      <div className="aspect-video overflow-hidden relative bg-white/5">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img 
          src={hasError ? `https://picsum.photos/seed/${app.id}/800/450` : app.image} 
          alt={app.name} 
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <button 
            onClick={() => onBuy(app)}
            className="w-full py-3 bg-gold text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
          >
            SỞ HỮU NGAY <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold font-montserrat text-white group-hover:text-gold transition-colors line-clamp-2 h-[3.5rem] flex items-center">
            {app.name}
          </h3>
          <span className="text-gold font-bold text-base">{app.price}</span>
        </div>
        <p className="text-gray-400 text-[11px] line-clamp-1 mb-3">
          {app.description}
        </p>
        <button 
          onClick={() => onBuy(app)}
          className="flex items-center gap-2 text-gold font-bold text-[10px] hover:underline uppercase tracking-tighter"
        >
          <ShoppingCart size={14} /> Chi tiết & Thanh toán
        </button>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-gold/10 rotate-45 translate-x-1/2 -translate-y-1/2" />
      </div>
    </motion.div>
  );
};
