
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function CreateEditArticlePage() {

  const params = useParams();
  const history = useHistory();
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ isCreate, setIsCreate ] = useState(true);

  const determineOperation = useCallback(async () => {

    if (!params.id) {
      setIsCreate(true);
    }
    else {
      const response = await axios.get(`/api/v1/articles/${params.id}`);
      setTitle(response.data.title);
      setBody(response.data.body);
      setIsCreate(false);
    }
    
  }, [params.id]);

  useEffect(() => {
    determineOperation();
  }, [determineOperation]);

  const onClickCreateHandler = async () => {
    try {
      const newArticle = await axios.post(`/api/v1/articles`, { title, body });
      history.push(`/article/${newArticle.data._id}`);
    }
    catch (e) {
      console.log('NO SE PUDO CREAR');
    }
  };

  const onClickUpdateHandler = async () => {
    try {
      await axios.put(`/api/v1/articles/${params.id}`, { title, body });
      history.goBack();
    }
    catch (e) {
      console.log('NO SE PUDO ACTUALIZAR');
    }
  };

  return (
    <div className="col">
      <input type="text" value={title} onChange={ (e) => setTitle(e.target.value) } />
      <hr/>
      <textarea multiple value={body}  onChange={ (e) => setBody(e.target.value) } />
      {
        isCreate ?
          <button onClick={onClickCreateHandler}>Create</button> :
          <button onClick={onClickUpdateHandler}>Update</button>
      }
    </div>
  );
}

export default CreateEditArticlePage;
