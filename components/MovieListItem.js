import React from 'react';
import { object } from 'prop-types';
import Link from 'next/link';
import {
    withStyles,
    ListItem,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';

class MovieListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    renderRating() {
        const { info } = this.props;

        let fullStars = Number.parseInt(info.rating.average / 2);
        let halfStar = info.rating.average / 2 - fullStars > Number.EPSILON;

        return [...new Array(5)].map((val, index) => {
            if (index < fullStars) {
                return <StarRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />;
            } else if (index < fullStars + halfStar) {
                return <StarHalfRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />;
            }
            return <StarBorderRoundedIcon key={index} fontSize='small' nativeColor='#ffab2d' />
        })
    }

    setDefaultPoster = (e) => e.target.src = `https://via.placeholder.com/75x110.png?text=403`;

    render() {
        const {
            classes,
            info
        } = this.props;

        return (
            <ListItem classes={{ root: classes.listItemRoot }}>
                <ListItemAvatar>
                    <Avatar
                        src={info.poster}
                        classes={{ root: classes.posterRoot }}
                        onError={this.setDefaultPoster}
                    />
                </ListItemAvatar>
                <div className={classes.overflowEllipsis}>
                    <Link href={`/movie?id=${info._id}`}>
                        <a className={`${classes.title} ${classes.line}`}>{info.title}</a>
                    </Link>
                    <p className={classes.intro}>
                        <span className={classes.line}>{`${info.year} / ${formatContent(info.countries)}`}</span>
                        <span className={classes.line}>{formatContent(info.casts.map(cast => cast.name))}</span>
                        <span className={classes.line}>{formatContent(info.genres.map(genre => genre.name))}</span>
                    </p>
                    <div className={classes.rating}>
                        <span>{this.renderRating()}</span>
                        <span>{info.rating.average}</span> <span> ({info.rating.rating_people}人评价)</span>
                    </div>
                </div>
            </ListItem>
        );
    }
}

function formatContent(strArr) {
    return strArr.join(' / ');
}

const styles = {
    listItemRoot: {
        alignItems: 'flex-start'
    },
    overflowEllipsis: {
        overflow: 'hidden'
    },
    title: {
        font: '14px Arial, Helvetica, sans-serif',
        '&:link': {
            color: '#37a',
            textDecoration: 'none',
        },
        '&:hover': {
            textDecoration: 'underline #37a'
        },
        '&:visited': {
            color: '#669'
        },
        '&:visited:hover': {
            textDecoration: 'underline #669'
        }
    },
    posterRoot: {
        width: 75,
        alignItems: 'flex-start',
        height: '100%',
        borderRadius: 0,
        marginRight: 26
    },
    intro: {
        minHeight: 50,
        width: '100%',
        font: '12px Arial, Helvetica, sans-serif',
        color: '#666'
    },
    line: {
        display: 'inline-block',
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    rating: {
        color: '#666',
        font: '12px Arial, Helvetica, sans-serif',
        '&>span:nth-of-type(2)': {
            margin: '0 3px',
            color: '#ffab2d'
        },
        '& svg': {
            verticalAlign: 'bottom'
        }
    }
};

MovieListItem.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(MovieListItem);
