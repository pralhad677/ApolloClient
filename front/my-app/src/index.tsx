import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache,createHttpLink,from ,ApolloLink,HttpLink,concat  } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie'

const endPoint = 'http://localhost:3006/graphql'
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

const client = new ApolloClient({
  // uri: 'http://localhost:3006/graphql',
  
  // link:  ApolloLink.from([ (link as unknown)  as ApolloLink,httpLink,uploadLink ]),
  // link:  ApolloLink.from([ ( authLink  as unknown)  as ApolloLink,httpLink, ]),
  // link:  ApolloLink.from([  authLink  ,httpLink, ]),
  
  link: authLink.concat(httpLink),
  // link:authLink,
   
  // link: concat(authLink, httpLink),
  // link:from([authLink,httpLink]),
  
  //link means how to connect to a server
  // link:  ApolloLink.from([ authLink,new HttpLink({
  //   uri:endPoint
  // }) ]), 
  
  cache: new InMemoryCache(),
  // credentials: "include",
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
