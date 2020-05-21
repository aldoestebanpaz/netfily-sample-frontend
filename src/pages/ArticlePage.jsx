import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function ArticlePage() {

  const params = useParams();
  const history = useHistory();
  const [ article, setArticle ] = useState({});

  const getArticles = useCallback(async () => {
    const response = await axios.get(`/api/v1/articles/${params.id}`);
    setArticle(response.data);
  }, [params.id]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const onClickDeleteHandler = async () => {
    try {
      await axios.delete(`/api/v1/articles/${params.id}`);
      history.push('/');
    } catch (error) {
      
    }
  }

  return (
    <div className="col">
      <Link to={`/article/edit/${params.id}`}>Edit</Link>
      <button onClick={onClickDeleteHandler}>Delete</button>
      <h1>{article.title}</h1>
      <hr/>
      <p className="card-text">{article.body}</p>
    </div>
  );
}

export default ArticlePage;
