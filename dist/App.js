import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
library.add(fas);
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Menu, { defaultIndex: '0', onSelect: function (index) { alert(index); }, mode: 'horizontal', defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link2"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "dropdown 1"),
                    React.createElement(MenuItem, null, "dropdown 2")),
                React.createElement(MenuItem, null, "cool link3")),
            React.createElement(Alert, { title: 'this is a danger!', type: 'danger', afterClose: function afterClose() { } }),
            React.createElement(Alert, { title: 'this is a default!', type: 'default' }, "Alert"),
            React.createElement(Alert, { title: 'this is a success!', type: 'success' }, "Alert"),
            React.createElement(Alert, { title: 'this is a warning!', type: 'warning' }, "Alert"),
            React.createElement(Tabs, { defaultIndex: '0', type: 'card' },
                React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E00" }, "this is content one"),
                React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E8C" }, "this is content two"),
                React.createElement(TabItem, { label: "\u7528\u6237\u7BA1\u7406" }, "this is content three")),
            React.createElement("p", null,
                "Edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload."),
            React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
}
export default App;
