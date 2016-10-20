import React from 'react';
import './Article.css';

const Article = ({article}) => {
  return (
    <div className='article'>
      <span className='title'>{article.title}</span><p dangerouslySetInnerHTML={{ __html: `... ${article.snippet} ...` }}></p>
    </div>
  )
}
export default Article;
