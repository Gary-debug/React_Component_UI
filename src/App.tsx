import React from 'react';
import Button from './components/Button/button';
import Alert, {BaseAlertProps} from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Button>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='primary' size='lager'>Large Primay</Button>
        <Button btnType='danger' size='small'>Small Danger</Button>
        <Button btnType='link' href='http://baidu.com'>Baidu Link</Button>
        <Button btnType='link' href='http://baidu.com' disabled target="_blank">Disabled Link</Button> */}
        {/* <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='horizontal' defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link2
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu> */}
        {/* <Alert title='this is a danger!' type='danger' afterClose={function afterClose(){}}></Alert>
        <Alert title='this is a default!' type='default'>Alert</Alert>
        <Alert title='this is a success!' type='success'>Alert</Alert>
        <Alert title='this is a warning!' type='warning'>Alert</Alert> */}
        <Tabs defaultIndex={'0'} type='card'>
          <TabItem label="选项卡一">
            this is content one
          </TabItem>
          <TabItem label="选项卡二">
            this is content two
          </TabItem>
          <TabItem label="用户管理">
            this is content three
          </TabItem>
        </Tabs>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
