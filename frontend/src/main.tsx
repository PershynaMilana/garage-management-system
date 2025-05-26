import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App.tsx';
import i18n from "./i18n.ts";
import { I18nextProvider } from "react-i18next";
// @ts-ignore
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </I18nextProvider>
        </Router>
    </React.StrictMode>,
);