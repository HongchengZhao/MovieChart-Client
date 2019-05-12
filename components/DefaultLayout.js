import React from 'react';
import { object } from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { AppBar, IconButton, InputBase, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
        this.getInput = this.getInput.bind(this);
    }

    getInput() {
        return this.input.value.trim();
    }

    search = () => {
        //const keyword = this.getInput();
        const { keyword } = this.state;
        keyword !== '' && Router.push(`/result?keyword=${keyword}`)
    }

    handleChange = event => {
        this.setState({ keyword: event.target.value });
    };

    render() {
        const { classes, children, defaultValue = '' } = this.props;
        return (
            <div>
                <AppBar classes={{ root: classes.root }}>
                    <Link href={`/`}>
                        <IconButton classes={{ root: classes.iconButton }}>
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <InputBase
                        classes={{ root: classes.inputRoot, input: classes.input }}
                        defaultValue={defaultValue}
                        placeholder='搜索电影名'
                        onChange={this.handleChange}
                        inputRef={n => this.input = n}
                        onKeyUp={(e) => e.keyCode === 13 && this.search()}
                    />
                    <IconButton
                        classes={{ root: classes.iconButton }}
                        onClick={this.search}
                    >
                        <SearchIcon />
                    </IconButton>
                </AppBar>
                {children}
            </div>
        );
    }
}

const styles = {
    root: {
        position: 'static',
        padding: '5px 20%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minWidth: 675,
        height: 'auto',
        background: '#eff3f5',
        boxShadow: 'none',
        borderBottom: '1px solid #e5ebe4'
    },
    inputRoot: {
        backgroundColor: fade('#fff', 0.15),
        marginLeft: 8,
        flex: 1,
        borderRadius: 5,
        paddingLeft: 10
    },
    input: {
        paddingLeft: '5px',
        background: 'rgba(255, 255, 255, 0.5)'
    },
    iconButton: {
        padding: 10,
    }
};

DefaultLayout.propTypes = {
    classes: object.isRequired
};


export default withStyles(styles)(DefaultLayout);