import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Alert, {BaseAlertProps} from './components/Alert/alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className='custom'>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target='_blank'>Baidu Link</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Disabled Link</Button>
        <br />
        <Alert title='this is a danger!' type='danger' afterClose={function afterClose(){}}></Alert>
        <Alert title='this is a default!' type='default'>Alert</Alert>
        <Alert title='this is a success!' type='success'>Alert</Alert>
        <Alert title='this is a warning!' type='warning' closable={false}>Alert</Alert>
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
