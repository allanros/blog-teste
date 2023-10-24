import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import PostsDestaque from './components/PostsDestaque.js';
import './global.css'
import { Header } from './components/Header.js';
import RelatedPosts from './components/RelatedPosts.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SinglePost from './components/SinglePost.js';
import Footer from './components/Footer.js';
import Breadcrumbs from './components/Breadcrumbs.js';


const client = new ApolloClient({
  uri: "http://localhost:8080/?graphql",
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Breadcrumbs />
      
      <div className='blog-content'>
        <Routes>
          <Route path='/' element={<PostsDestaque />} />
        </Routes>
        <section className='related-posts'>
          <Routes>
            <Route path='/' element={<RelatedPosts />} />
          </Routes>
        </section>
        <Routes>
          <Route path="/:slugPost" element={<SinglePost />} />
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
