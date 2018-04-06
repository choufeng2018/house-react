import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // 使用antd提供的国际化方案
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>,
    document.getElementById('root'));
    registerServiceWorker();
