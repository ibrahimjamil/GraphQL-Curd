import './App.css';
import {useState} from 'react'
import List from './List'
import Form from './Form'

import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const uploadLink = createUploadLink({ uri: 'http://localhost:5000/' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([uploadLink]),
});


function App() {
  const [fetching,setfetching] = useState(false)

  const doFetch = (fetch) =>{
    setfetching(fetch)
  }
  return (
    <ApolloProvider client={client}>
      <div 
        style={{
            display:"flex",
            flexDirection:"row",
            height:"100vh",
            width:"100vw"
          }}
      >
        <List 
          style={{
            width:"50%",
            borderStyle: "solid",
            borderColor: "#FFFFFF #FE6B8B #FFFFFF #FFFFFF"
          }}
          fetching={fetching}
          updateFetching={(fetch)=>doFetch(fetch)}
        />
        <Form 
          style={{
            width:"50%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
          doFetch={(fetch)=>doFetch(fetch)}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
