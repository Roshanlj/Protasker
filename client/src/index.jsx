import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App/App';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://wympqviqydwlvwtskjbz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5bXBxdmlxeWR3bHZ3dHNramJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNDE1NTgsImV4cCI6MjAyOTcxNzU1OH0.gijuX9pUsieUI3GaGGCVo0u_Mx4_vdvK5io7Y6xJyyA"
)

ReactDOM.render(
  <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase}>
    <App />
    </SessionContextProvider>
  </Provider>,
  document.getElementById('root')
);
