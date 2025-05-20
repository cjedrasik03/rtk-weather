'use client';

import { Provider } from 'react-redux';
import store from './store/store.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}