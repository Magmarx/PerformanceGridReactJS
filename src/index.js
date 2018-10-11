import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

module.exports = {
    renderAt: function(node) {
        ReactDOM.render(<App />, node);
        // registerServiceWorker();
    },    
}
