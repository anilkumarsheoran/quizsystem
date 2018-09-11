import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux' 
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Saga' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
var sagaMiddleware = createSagaMiddleware()

const store = createStore(connectRouter(history)(rootReducer), composeWithDevTools(applyMiddleware(sagaMiddleware,routerMiddleware(history))))
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Provider store={store}><App history={history} /></Provider>, document.getElementById('root'));
registerServiceWorker();

