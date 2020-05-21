import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {

  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    (async () => {

      const response = await axios.get('/api/v1/articles');
      setArticles(response.data);

    })();
  }, []);

  const cards = articles.map(a =>
    <div key={a._id} className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title"><Link to={`/article/${a._id}`} >{a.title}</Link></h5>
        <p className="card-text">{a.body}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/article/create">Create</Link>
      <div className="card-columns">
        { cards }
      </div>
    </div>
  );
}

export default HomePage;
