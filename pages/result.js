import React from 'react';
import { withRouter } from 'next/router';
import { List, Paper, withStyles } from '@material-ui/core';
import Pagination from 'rc-pagination';
import { object } from 'prop-types';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import DefaultLayout from '../components/DefaultLayout';
import MovieListItem from '../components/MovieListItem';
import MovieItemSkeleton from '../components/MovieItemSkeleton';


const SEARCH = gql`
query searchFilms($keyword: String, $pageIndex: Int, $pageSize: Int){
    search(keyword: $keyword, pageIndex: $pageIndex, pageSize: $pageSize){
        films {
            _id
            title
            poster
            countries
            rating{
                average
                rating_people
                stars
            }
            casts{
                _id
                name
            }
            genres{
                _id
                name
            }
            year
        }
        totalCount
    }
}`;

class Result extends React.Component {
    static async getInitialProps({ query }) {
        let keyword = query.keyword;
        return { keyword };
    }

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1
        }
    }

    changPage = (cur) => {
        this.setState({ pageIndex: cur });
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, keyword } = this.props;
        const { pageIndex } = this.state;
        return (
            <DefaultLayout defaultValue={keyword}>
                <Paper classes={{ root: classes.root }}>
                    <Query query={SEARCH} variables={{ keyword, pageIndex, pageSize: 20 }}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return (
                                    <List classes={{ root: classes.movieChart }}>
                                        {
                                            [...new Array(10).keys()].map((_, index) => <MovieItemSkeleton key={index} />)
                                        }
                                    </List>
                                );
                            }
                            
                            if (error) return `Error! ${error}`;

                            const results = data.search.films;
                            const totalCount = data.search.totalCount;
                            return (
                                <>
                                    <List classes={{ root: classes.movieCharts }}>
                                        {
                                            results.map((val) => <MovieListItem key={val._id} info={val} />)
                                        }
                                    </List>
                                    <Pagination
                                        onChange={this.changPage}
                                        current={pageIndex}
                                        pageSize={20}
                                        total={totalCount}
                                    />
                                </>
                            );
                        }}
                    </Query>
                </Paper>
            </DefaultLayout>
        );
    }
}

const styles = {
    root: {
        width: '60%',
        minWidth: 675,
        margin: '30px auto',
        padding: '10px'
    },
    movieCharts: {
        '&>li:not(:first-of-type)': {
            borderTop: '1px dashed #ddd'
        }
    }
};

Result.propTypes = {
    classes: object.isRequired
};

export default withRouter(withStyles(styles)(Result));