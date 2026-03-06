import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, editorService } from '../services/editorService';
import { affiliateService } from '../services/affiliateService';

interface EditorContextType {
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  siteData: SiteData;
  setSiteData: (data: SiteData) => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  saveDraft: () => void;
  publish: () => void;
  isAdmin: boolean;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(editorService.getDraft());
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = affiliateService.getUser();
    setIsAdmin(user?.role === 'admin');
  }, []);

  const saveDraft = () => {
    editorService.saveDraft(siteData);
  };

  const publish = () => {
    editorService.publish(siteData);
    setIsEditMode(false);
  };

  return (
    <EditorContext.Provider value={{
      isEditMode,
      setIsEditMode,
      siteData,
      setSiteData,
      selectedElement,
      setSelectedElement,
      saveDraft,
      publish,
      isAdmin
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
