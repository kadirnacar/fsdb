import { dom, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import 'primeflex/primeflex.css';
import 'primeicons/fonts/primeicons.woff2';
import 'primeicons/primeicons.css';
// import 'primeicons/fonts/primeicons.eot';
// import 'primeicons/fonts/primeicons.woff';
// import 'primeicons/fonts/primeicons.svg';
// import 'primeicons/fonts/primeicons.ttf';
import 'primereact/resources/primereact.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { environment } from '../environments/environment';
import App from './container/App';
import './styles/layout/layout.scss';
import { PrimeReactProvider } from 'primereact/api';

if (environment.production) {
  disableReactDevTools();
}

library.add(fas);

dom.watch();

const fetchData = async () => {
  let response: any = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'white',
    theme: 'bootstrap4-light-blue',
    scale: 14,
  };

  const styl = document.getElementById('theme-css');
  if (styl) {
    const val = styl?.getAttribute('href');
    styl.setAttribute('href', val?.replace('arya-orange', response.theme) || '');
  }

  const container = document.getElementById('root');

  const root = createRoot(container!);

  root.render(
    <BrowserRouter>
      <PrimeReactProvider>
        <App layoutConfig={response} />
      </PrimeReactProvider>
    </BrowserRouter>
  );
};
fetchData().catch(console.error);
