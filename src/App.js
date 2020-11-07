import React from 'react';
import './App.css';
import ArticleWrapper from "./components/ArticleWrapper.js"
import NewsAPI from 'newsapi';
import TextField from '@material-ui/core/TextField';  
import Button from '@material-ui/core/Button'; 
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class App extends React.Component {
  //State variable to grab from fields and hold page values, sources, and articles
  state = {
    technologySources: "",
    sportsSources: "",
    entertainmentSources: "",
    query:"",
    filter:"Technology",
    sort: "Top Headlines",
    currPage: 1,
    totalPages: 1,
    articles: []
  };
//sets the query value for the api call
  getQ = (event) => {
    this.setState({query: event.target.value});
  }
 //sets whether the user wants to grab news from sports, technology, or entertainment
  setFilter = (event) => {
    this.setState({filter: event.target.value});
  }


//sets whether the user wants to get the top headlines or all the articles from a filtered source
  setSort = (event) => {
    this.setState({sort: event.target.value});
  }


//this basically sents the search button in motion. You have the option of either searching through top headlines or everything
  getSort = () => {
    this.setState({currPage: 1});
    this.setState({totalPages: 1});
    let filter = this.state.filter;
    let sort = this.state.sort;
    let query = this.state.query;
    if(sort === "Top Headlines") {
      this.getHeadlines(query,filter, this.state.currPage)
    }
    else {
      this.getArticles(query,filter, this.state.currPage)
    }
  }
//next page of articles
  nextPage = () => {
    if (this.state.totalPages > this.state.currPage) {
      let next = ++this.state.currPage;
      this.setState({currPage : next});
      if (this.state.sort === "Top Headlines") {
        this.getHeadlines(this.state.query, this.state.filter, this.state.currPage);
      } else {
        this.getArticles(this.state.query, this.state.filter, this.state.currPage);
      }
    }
  }
  //previous page of articles
  previousPage = () => {
    if(this.state.currPage != 1) {
      let prev = --this.state.currPage;
      this.setState({currPage : prev})
      if (this.state.sort === "Top Headlines") {
        this.getHeadlines(this.state.query, this.state.filter, this.state.currPage);
      } else {
        this.getArticles(this.state.query, this.state.filter, this.state.currPage);
      }
    }
  }
//gets the sources for the category chosen. This is important for the everything api.
  getSources() {
    const newsapi = new NewsAPI('78b9d599c4f94f8fa3afb1a5458928d6', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

    let entertainmentSources = "";
    let technologySources = "";
    let sportsSources = "";

    newsapi.v2.sources({
        category: 'technology',
    }).then(response => {
        for (let i = 0; i < response.sources.length; i++) {
            technologySources += response.sources[i].id + ",";
        }
        technologySources = technologySources.replace(/,\s*$/, "");
        this.setState({technologySources: technologySources});
    });
    
    newsapi.v2.sources({
        category: 'entertainment',
    }).then(response => {
        for (let i = 0; i < response.sources.length; i++) {
            entertainmentSources += response.sources[i].id + ",";
        }
        entertainmentSources = entertainmentSources.replace(/,\s*$/, "");
        this.setState({entertainmentSources: entertainmentSources});
    });
    
    newsapi.v2.sources({
        category: 'sports',
    }).then(response => {
        for (let i = 0; i < response.sources.length; i++) {
            sportsSources += response.sources[i].id + ",";
        }
        sportsSources = sportsSources.replace(/,\s*$/, "");
        this.setState({sportsSources: sportsSources});
    });
  }
//takes the sources from the getSources method and uses it to call the everything api
  getArticles(query, filter, page) {
    const newsapi = new NewsAPI('78b9d599c4f94f8fa3afb1a5458928d6', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });
    let source;
    if (filter === "Technology") {
      source = this.state.technologySources;
    } else if (filter === "Sports") {
      source = this.state.sportsSources;

    } else if (filter === "Entertainment") {
      source = this.state.entertainmentSources;

    }
    newsapi.v2.everything({
      q: query,
      sources: source,
      page: this.state.currPage
    }).then(response => {
      let totalPages = Math.ceil(response.totalResults / 20);
      this.setState({articles: response.articles});
      this.setState({totalPages: totalPages});
  }, err => {
    console.error(err);
  });
}
//gets top headlines for the filter chosen
  getHeadlines(query, filter, page) {
    const newsapi = new NewsAPI('78b9d599c4f94f8fa3afb1a5458928d6', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });
    let category;
    if (filter === "Technology") {
      category = "technology";
    } else if (filter === "Sports") {
      category = "sports";
    } else if (filter === "Entertainment") {
      category = "entertainment"
    }
    newsapi.v2.topHeadlines({
      q: query,
      category: category,
      page: this.state.currPage
    }).then(response => {
      let totalPages = Math.ceil(response.totalResults / 20);
      this.setState({ articles: response.articles });
      this.setState({ totalPages: totalPages });
    });
  }

componentDidMount() {
  this.getSources(); 
}
  
  render() {
    return (
      <div>
        <div className="topBar">
          <FormControl>
            <Select
              defaultValue="Top Headlines"
              id="sort"
              onChange={this.setSort}
            >
              <MenuItem value={"Top Headlines"}>Top Headlines</MenuItem>
              <MenuItem value={"All Articles"}>All Articles</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              defaultValue="Technology"
              id="filter"
              onChange={this.setFilter}
            >
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
            </Select>
          </FormControl>
          <TextField placeholder="search..." id="searchInput" value={this.state.query} onChange={this.getQ}>
          </TextField>
          <Button variant="contained" color="primary" size="small" onClick={this.getSort}>search</Button>
        </div>
        <ArticleWrapper technologySources={this.state.technologySources} sportsSources={this.state.sportsSources} entertainmentSources={this.state.entertainmentSources} articles={this.state.articles} />
        <div className="bottomBar">
          <Button onClick={this.previousPage}>Previous</Button>
          <Button onClick={this.nextPage}>Next</Button>
          <label>   Current Page : {this.state.currPage}</label>
          <label>  ----- Total # of Pages : {this.state.totalPages}</label>
        </div>
      </div>

    );
  }
}

export default App;
