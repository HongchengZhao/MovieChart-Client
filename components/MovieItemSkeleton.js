import Skeleton from 'react-loading-skeleton';
import {
    withStyles,
    ListItem,
    ListItemAvatar
} from '@material-ui/core';

const MovieItemSkeleton = (props) => {
    const { classes } = props;

    return (
        <ListItem classes={{ root: classes.listItemRoot }}>
            <ListItemAvatar>
                <Skeleton width={75} height={110} />
            </ListItemAvatar>
            <div className={classes.overflowEllipsis}>
                <Skeleton width={100}/>
                <p className={classes.intro}>
                    <Skeleton count={3} />
                </p>
                <div className={classes.rating}>
                    <Skeleton width={150} />
                </div>
            </div>

        </ListItem>
    )
};

const styles = {
    listItemRoot: {

        alignItems: 'flex-start'
    },
    overflowEllipsis: {
        overflow: 'hidden',
        width: 'calc(100% - 110px)',
        padding: '0 10px'
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

export default withStyles(styles)(MovieItemSkeleton);