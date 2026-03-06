import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { EditableText } from './VisualEditor';
import { useEditor } from '../context/EditorContext';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  onTitleChange?: (val: string) => void;
  onSubtitleChange?: (val: string) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className,
  align = 'center',
  onTitleChange,
  onSubtitleChange
}) => {
  const { isEditMode } = useEditor();

  return (
    <div className={cn(
      "mb-12",
      align === 'center' ? "text-center" : "text-left",
      className
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <EditableText 
          id={`section-title-${title}`}
          as="h2"
          value={title}
          onChange={onTitleChange || (() => {})}
          className="text-4xl md:text-6xl font-display font-bold gold-text mb-4 uppercase tracking-tighter"
        />
      </motion.div>
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <EditableText 
            id={`section-subtitle-${title}`}
            as="p"
            value={subtitle}
            onChange={onSubtitleChange || (() => {})}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-montserrat"
          />
        </motion.div>
      )}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 100 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={cn(
          "h-1 bg-gradient-to-right from-gold to-transparent mt-6",
          align === 'center' ? "mx-auto" : ""
        )}
      />
    </div>
  );
};
