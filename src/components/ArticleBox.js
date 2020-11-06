import React from 'react';
import Box from '@material-ui/core/Box';
import { spacing,sizing, borders } from '@material-ui/system';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import { Card } from '@material-ui/core'
import { CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// class for each box of results
export default class ArticleBox extends React.Component {
    render() {
        let article = this.props.article;
        return (
            <div>
                <Card className="article-card">
                    <Grid container>
                        <Grid item xs={8}>
                            <CardContent>
                                <Typography variant="h6">
                                    <a href={article.url} target="_blank">{article.title}</a>
                                </Typography>
                                <Typography variant="subtitle1">
                                    {article.author ? article.author : "No author"}
                                    {" - " + article.source.name}
                                    {" - " + article.publishedAt}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {article.description}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {article.content}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={4}>
                            <img className="article-image" src={article.urlToImage}></img>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
}



