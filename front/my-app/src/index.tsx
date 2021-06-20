import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache,createHttpLink,from ,ApolloLink,HttpLink,concat,NormalizedCacheObject,split  } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { WebSocketLink } from '@apollo/client/link/ws';

import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3007/graphql',
  options: {
    reconnect: true
  }
});


const endPoint = 'http://localhost:3007/graphql'
const cookies = new Cookies()

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      // authorization:'Bearer' + cookies.get('jwt') ,
    }
  }))
return forward(operation);
})


const httpLink = createHttpLink({
  uri: endPoint,
  credentials: 'include'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: authLink.concat(splitLink),
   cache: new InMemoryCache(),
});
  
ReactDOM.render(
  <React.StrictMode>
    <Router>

        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
