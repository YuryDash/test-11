import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithRedux from './AppWithRedux';
import {store} from './state/store';
import {Provider} from 'react-redux';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);
serviceWorker.unregister();
