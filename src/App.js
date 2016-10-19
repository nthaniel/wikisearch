import React, { Component } from 'react';
import Searchbar from './components/Searchbar.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      articles: [],
      totalHits: 0
    };

    this.fetchArticles = this.fetchArticles.bind(this);
  }


  fetchArticles(searchterm, offset = 0) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchterm}&sroffset=${offset}&srlimit=10&srprop=snippet&origin=*&format=json`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          articles: res.query.search,
          totalHits: res.query.searchinfo.totalhits
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>wikisearch</h2>
        </div>
        <Searchbar submitHandler={this.fetchArticles}/>
        {this.state.articles.length ?
          this.state.articles.map((article, i) => {
            return (
              <div key={i}>
                <span className='title'>{article.title}</span><p dangerouslySetInnerHTML={{ __html: article.snippet }}></p>
              </div>
            );
          })
          : <p className='App-intro'>search with searchbar</p>
        }
      </div>
    );
  }
}

export default App;
