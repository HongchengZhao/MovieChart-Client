import React from 'react';
import { withRouter } from 'next/router';
import { object } from "prop-types";
import Router from 'next/router';
import {
    withStyles, List, Paper
} from '@material-ui/core';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Pagination from 'rc-pagination';
import DefaultLayout from '../components/DefaultLayout';
import MovieListItem from "../components/MovieListItem";
import MovieItemSkeleton from '../components/MovieItemSkeleton';

const GET_FILMS = gql`
query getFilmsSlice($pageIndex: Int, $pageSize: Int){
    films(pageIndex: $pageIndex, pageSize: $pageSize){
        films {
            _id
            title
            year
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
        }
        totalCount
    }
}`;

class MovieChart extends React.Component {
    static async getInitialProps({ query }) {
        const pageIndex = Number(query.page) || 1;
        return { pageIndex };
    }

    changPage = (cur) => {
        Router.push(`/?page=${cur}`);
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, pageIndex = 1 } = this.props;
        return (
            <DefaultLayout>
                <Paper classes={{ root: classes.root }}>
                    <Query query={GET_FILMS} variables={{ pageIndex, pageSize: 20 }}>
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

                            const films = data.films.films;
                            const totalCount = data.films.totalCount;

                            return (
                                <>
                                    <List classes={{ root: classes.movieChart }}>
                                        {
                                            films.map(movie =>
                                                <MovieListItem key={movie._id} info={movie} />)
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
    movieChart: {
        '&>li:not(:first-of-type)': {
            borderTop: '1px dashed #ddd'
        }
    }
};

MovieChart.propTypes = {
    classes: object.isRequired
};


export default withRouter(withStyles(styles)(MovieChart));