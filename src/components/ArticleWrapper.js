import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ArticleBox from "./ArticleBox.js";

export default class ArticleWrapper extends React.Component {

    render() {
        let articles = this.props.articles;
        if (articles.length === 0) {
            return (
                <div className="article-wrapper">
                    <h1>No results</h1>
                </div>
            )
        } else {
        return(
            <div className="article-wrapper">
                    {articles.map((a) => (
                        <ArticleBox article={a} />
                    ))}
            
            </div>

        
            )}
                    }
            


}
//style={{backgroundColor: '#3f51b5', height: '95vh', width: '100vw', overflow: 'scroll' }}