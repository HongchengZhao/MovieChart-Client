import {
    withStyles, Card, CardContent, Typography
} from "@material-ui/core";
import Skeleton from 'react-loading-skeleton';


const MovieSkeleton = (props) => {
    const { classes } = props;
    return (
        <Card className={classes.root}>
            <Typography component='h2' variant='h2' classes={{ root: classes.title }}>
                <Skeleton width={300} />
            </Typography>
            <div className={classes.flexBox}>
                <Skeleton width={135} height={200} />
                <CardContent classes={{ root: classes.contentRoot }}>
                    <Skeleton width={80} />
                    <Skeleton width={150} />
                    <Skeleton width={300} />
                    <Skeleton width={90} />
                    <Skeleton width={110} />
                    <Skeleton width={60} />
                    <Skeleton width={200} />
                    <Skeleton width={100} />
                    <Skeleton width={220} />
                    <Skeleton width={150} />
                </CardContent>
                <div className={classes.rating}>
                    <Skeleton width={30} />
                    <div className={classes.average}>
                        <Skeleton width={80} height={35} />
                    </div>
                    <div className={classes.stars}>
                        <Skeleton count={5} width={100} height={15}/>
                    </div>
                </div>
            </div>
            <CardContent>
                <Typography component='h3' variant='subtitle1' classes={{ root: classes.subtitle }}>
                    <Skeleton width={80} />
                </Typography>
                <Skeleton count={6} />
            </CardContent>
        </Card>
    );
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
        '&>span': {
            display: 'block',
            lineHeight: '150%',
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
        fontSize: 16
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
        margin: '10px 0',
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
        '&>span': {
            display: 'flex',
            flexDirection: 'column'
        },
        '&>span>span': {
            dispaly: 'block',
            margin: '3px 0'
        },
    }
};

export default withStyles(styles)(MovieSkeleton);