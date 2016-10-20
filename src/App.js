import React, { Component } from 'react';
import Searchbar from './components/Searchbar.js';
import Article from './components/Article.js';
import './App.css';


let currentTimer;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      articles: [],
      totalHits: 0
    };

    this.fetchArticles = this.fetchArticles.bind(this);
    this.debouncedFetchArticles = this.debouncedFetchArticles.bind(this);
  }


  debouncedFetchArticles(searchterm, offset = 0) {
    if (searchterm === '') searchterm = 'wikipedia';
    
    currentTimer = {};

    setTimeout(((originalTimer) => {
      if (originalTimer === currentTimer) {
        return this.fetchArticles(searchterm, offset);
      } else {
        console.log('cancelled');
      }
    }).bind(this, currentTimer), 500);
  }

  fetchArticles(searchterm, offset) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchterm}&sroffset=${offset}&srlimit=10&srprop=snippet&origin=*&format=json`)
      .then(res => res.json())
      .then(res => {
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
        <Searchbar submitHandler={this.debouncedFetchArticles}/>
        {this.state.articles.length
          ? this.state.articles.map((article, i) => {
              return (
                <Article article={article} key={i} />
              );
            })
          : <p className='App-intro'>search with searchbar</p>
        }
      </div>
    );
  }
}

export default App;
