import React from 'react';
import {object} from "prop-types";
import Link from 'next/link';
import {
    withStyles,
    Button
} from "@material-ui/core";

class Pagination extends React.Component {

    render() {
        const {
            classes,
            range,
            currentPage
        } = this.props;

        return (
            <div className={classes.wrapper}>
                <Link href={`/index?page=${parseInt(currentPage) - 1}`}>
                    <Button
                        component='a'
                        disabled={parseInt(currentPage) === 1}
                        classes={{root: classes.firstBtn}}
                    >上一页
                    </Button>
                </Link>
                {
                    [...new Array(range)].map((val, index) =>
                        <Link href={`/index?page=${index + 1}`}>
                            <Button
                                component='a'
                                key={index}
                                classes={{root: parseInt(currentPage) === index + 1 ? `${classes.btn} ${classes.curBtn}` : classes.btn}}
                            >
                                {index + 1}
                            </Button>
                        </Link>)
                }
                <Link href={`/index?page=${parseInt(currentPage) + 1}`}>
                    <Button
                        component='a'
                        disabled={parseInt(currentPage) === (range)}
                        classes={{root: classes.lastBtn}}
                    >
                        下一页
                    </Button>
                </Link>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        textAlign: 'center',
        margin: '10px 0',
        '& a': {
            border: '1px solid #dee2e6',
            color: '#007bff',
            minWidth: 40
        }
    },
    btn: {
        borderLeft: 'none !important',
        borderRadius: 0
    },
    firstBtn: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    lastBtn: {
        borderLeft: 'none !important',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    curBtn: {
        backgroundColor: '#007bff',
        color: 'white !important'
    }
};

Pagination.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Pagination);