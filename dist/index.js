import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { default as Button } from './components/Button';
export { default as Menu } from './components/Menu';
export { default as Alert } from './components/Alert';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Progress } from './components/Progress';
export { default as Select } from './components/Select';
export { default as Tabs } from './components/Tabs';
export { default as Transition } from './components/Transition';
export { default as Upload } from './components/Upload';
