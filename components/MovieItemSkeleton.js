import Skeleton from './Skeleton';
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
        flex: 100,
        overflow: 'hidden',
        padding: '0 10px'
    },
    title: {
        font: '14px Arial, Helvetica, sans-serif'
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
        }
    }
};

export default withStyles(styles)(MovieItemSkeleton);