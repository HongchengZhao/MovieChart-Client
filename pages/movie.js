import React from 'react';
import { withRouter } from 'next/router';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
    withStyles, Card, CardMedia, CardContent, Typography
} from "@material-ui/core";
import { object } from "prop-types";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';
import DefaultLayout from "../components/DefaultLayout";
import MovieSkeleton from '../components/MovieSkeleton';

const GET_FILM = gql`
query getFilm($id: ID){
    film(id: $id){
        _id
        title
        poster
        summary
        pubdate
        countries
        rating{
            average
            rating_people
            stars
        }
        writers{
            _id
            name
        }
        directors{
            _id
            name
        }
        casts{
            _id
            name
        }
        languages{
            _id
            name
        }
        genres{
            _id
            name
        }
        imdb
        aka
        duration
        year
    }
}`;


class Movie extends React.Component {
    static async getInitialProps({ query }) {
        const movieId = query.id;
        return { movieId };
    }

    renderRating(movie) {
        const fullStars = Number.parseInt(movie.rating.average / 2);
        const halfStar = movie.rating.average / 2 - fullStars > Number.EPSILON;

        return [...new Array(5)].map((_, index) => {
            if (index < fullStars) {
                return <StarRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />;
            } else if (index < fullStars + halfStar) {
                return <StarHalfRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />;
            }
            return <StarBorderRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />
        })
    }

    renderStars(movie) {
        return movie.rating.stars.map((val, index) =>
            <div key={index}>
                <span>{`${5 - index}星`}</span>
                <div data-percentage={`${val}%`} style={{ width: val + 'px' }}> </div>
            </div>
        )
    }

    render() {
        const { classes, movieId } = this.props;

        return (
            <DefaultLayout>
                <Query query={GET_FILM} variables={{ id: movieId }}>
                    {({ loading, error, data }) => {
                        if (loading) return <MovieSkeleton />;

                        if (error) {
                            return `Error! ${error}`;
                        }

                        const movie = data.film;
                        return (
                            <Card className={classes.root}>
                                <Typography component='h2' variant='h2' classes={{ root: classes.title }}>
                                    {movie.title}<span>{` (${movie.year})`}</span>
                                </Typography>
                                <div className={classes.flexBox}>
                                    <CardMedia
                                        component='img'
                                        src={movie.poster}
                                        classes={{ media: classes.poster }}
                                        onError={e => e.target.src = `https://via.placeholder.com/135x200.png?text=403`}
                                    />
                                    <CardContent classes={{ root: classes.contentRoot }}>
                                        <p><span>导演: </span><span>{formatContent(movie.directors.map(d => d.name))}</span></p>
                                        <p><span>编剧: </span><span>{formatContent(movie.writers.map(w => w.name))}</span></p>
                                        <p><span>主演: </span><span>{formatContent(movie.casts.map(c => c.name))}</span></p>
                                        <p><span>类型: </span><span>{formatContent(movie.genres.map(g => g.name))}</span></p>
                                        <p><span>制片国家/地区: </span><span>{formatContent(movie.countries)}</span></p>
                                        <p><span>语言: </span><span>{formatContent(movie.languages.map(l => l.name))}</span></p>
                                        <p><span>上映日期: </span><span>{formatContent(movie.pubdate)}</span></p>
                                        <p><span>片长: </span><span>{`${movie.duration}分钟`}</span></p>
                                        <p><span>又名: </span><span>{formatContent(movie.aka)}</span></p>
                                        <p><span>IMBDb链接: </span><span>{movie.imdb}</span></p>
                                    </CardContent>
                                    <div className={classes.rating}>
                                        <span style={{ color: '#9B9B9B' }}>评分</span>
                                        <div className={classes.average}>
                                            <strong>{movie.rating.average}</strong>
                                            <div>
                                                <div>{this.renderRating(movie)}</div>
                                                <div>{`${movie.rating.rating_people}人评价`}</div>
                                            </div>
                                        </div>
                                        <div className={classes.stars}>
                                            {this.renderStars(movie)}
                                        </div>
                                    </div>
                                </div>
                                <CardContent>
                                    <Typography component='h3' variant='subtitle1' classes={{ root: classes.subtitle }}>剧情简介</Typography>
                                    <p className={classes.summary}>{movie.summary}</p>
                                </CardContent>
                            </Card>
                        );
                    }}
                </Query>
            </DefaultLayout>
        );
    }
}

function formatContent(strArr) {
    return strArr.join(' / ');
}

const styles = {
    root: {
        width: '60%',
        minWidth: 675,
        margin: '30px auto',
        padding: '10px',
        font: '13px Arial, Helvetica, sans-serif'
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    poster: {
        width: 135,
        height: 'auto'
    },
    contentRoot: {
        flex: 2,
        margin: '0 20px',
        lineHeight: 1.62,
        padding: 0,
        '&>p': {
            lineHeight: '150%',
            margin: '3px 0'
        },
        '&>p>span:first-child': {
            color: '#666'
        }
    },
    title: {
        fontWeight: 'bold',
        color: '#494949',
        fontSize: 26,
        margin: '10px 0 15px 0',
        '&>span': {
            color: '#888'
        }
    },
    summary: {
        textAlign: 'justify',
        textIndent: '2em',
        wordBreak: 'break-all',
        lineHeight: '150%'
    },
    subtitle: {
        fontWeight: 'normal',
        color: '#007722',
        fontSize: 16,
        '&:after': {
            content: '\' · · · · · ·\''
        }
    },
    rating: {
        minWidth: 160,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #eaeaea',
        padding: '0 0 15px 15px'
    },
    average: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        '& strong': {
            color: '#494949',
            fontSize: 28,
            fontStyle: 'normal',
            fontWeight: 'normal'
        },
        '& svg': {
            verticalAlign: 'bottom'
        },
        '&>div': {
            padding: '10px 0 10px 5px',
            color: '#37a'
        }
    },
    stars: {
        color: '#9B9B9B',
        '&>div>div': {
            position: 'relative',
            display: 'inline-block',
            height: 15,
            backgroundColor: '#ffab2d',
            verticalAlign: 'bottom',
            marginLeft: '5px'
        },
        '&>div>div:after': {
            position: 'absolute',
            content: 'attr(data-percentage)',
            right: -33,
            fontSize: 11
        }
    }
};

Movie.propTypes = {
    classes: object.isRequired
};

export default withRouter(withStyles(styles)(Movie));