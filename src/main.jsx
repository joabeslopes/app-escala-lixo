import { createRoot } from 'react-dom/client';
import './main.css';
import MainForm from './components/MainForm/MainForm.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <MainForm />
  </>
);