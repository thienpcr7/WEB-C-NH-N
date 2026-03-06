import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { EditorProvider } from './context/EditorContext.tsx';
import { ADMIN_VISUAL_EDITOR_CORE } from './components/AdminVisualEditorCore.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorProvider>
      <App />
      <ADMIN_VISUAL_EDITOR_CORE />
    </EditorProvider>
  </StrictMode>,
);
