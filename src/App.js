import React, { Component } from 'react';
import Searchbar from './components/Searchbar.js';
import Article from './components/Article.js';
import Pagination from './components/Pagination.js';
import './App.css';

/*

Implementation notes –

The debouncedFetchArticles function works by checking if the currentTimerSymbol
is equal to the originalTimerSymbol (i.e. the timer symbol that was created when 
the setTimeout was put in place). If the two are equal, no new calls to the function
have been made within the debounce window, so the fetch can proceed.

*/


let currentTimerSymbol;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      articles: [],
      totalHits: 0,
      searchterm: ''
    };

    this.fetchArticles = this.fetchArticles.bind(this);
    this.debouncedFetchArticles = this.debouncedFetchArticles.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.changeOffset = this.changeOffset.bind(this);
  }


  debouncedFetchArticles(searchterm, offset = 0) {
    if (searchterm === '') searchterm = 'wikipedia';

    currentTimerSymbol = Symbol(); 

    setTimeout(((originalTimerSymbol) => {
      if (originalTimerSymbol === currentTimerSymbol) {
        return this.fetchArticles(searchterm, offset);
      } else {
        console.log('cancelled');
      }
    }).bind(this, currentTimerSymbol), 500);
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

  updateSearchTerm(searchterm) {
    this.setState({searchterm, offset: 0});
    this.debouncedFetchArticles(searchterm, this.state.offset);
  }

  changeOffset(num) {
    let newOffset = this.state.offset + 10 * num;
    this.setState({offset: newOffset});
    this.fetchArticles(this.state.searchterm, newOffset);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>wikisearch</h2>
        </div>
        <Searchbar submitHandler={this.updateSearchTerm} value={this.state.searchterm}/>
        {this.state.articles.length
          ? this.state.articles.map((article, i) => {
              return (
                <Article article={article} key={i} />
              );
            })
          : <p className='App-intro'>search with searchbar</p>
        }
        {this.state.articles.length
          ? <Pagination 
              offset={this.state.offset / 10} 
              totalHits={this.state.totalHits}
              clickHandler={this.changeOffset}
            />
          : null
        }
      </div>
    );
  }
}

export default App;
