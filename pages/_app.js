import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

class MyApp extends App {
    render() {
        const { Component, pageProps, apolloClient } = this.props
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Head>
                        <meta name="viewport"
                            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                        <link rel="stylesheet" href="/static/rc-pagination.css" />
                        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
                        <title>Movie Charts</title>
                    </Head>
                    <Component {...pageProps} />
                    <style global jsx>{`
                    html, body {
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        min-height: 100vh;
                        transition: all 500ms ease-out;
                    }
                    body>div{
                        min-height: 100vh;
                    }
                `}</style>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApolloClient(MyApp)

/*
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    constructor(props){
        super(props);
        this.state = {
            movieList: []
        }
    }

    componentDidMount(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/static/films.json');
        xhr.addEventListener('loadend', () => {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                let list = MyApp.process(xhr.response);
                this.setState({
                    movieList: list
                });
            } else {
                console.log(`Status ${xhr.status}: ${xhr.statusText}`);
            }
        });
        xhr.send();
    }

    static process(text) {
        let leftBraces = [];
        let jsonArr = [];
        for (let i = 0; i < text.length; ++i) {
            if (text[i] === '{') {
                leftBraces.push(i);
            } else if (text[i] === '}') {
                if (leftBraces.length === 1) {
                    jsonArr.push(JSON.parse(text.substring(leftBraces[0], i + 1)));
                }
                leftBraces.pop();
            }
        }
        return jsonArr;
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <meta name="viewport"
                          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
                    <title>Movie Charts</title>
                </Head>
                <Component {...pageProps} movieList={this.state.movieList}/>
                <style global jsx>{`
                    html, body {
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        min-height: 100vh;
                        transition: all 500ms ease-out;
                    }
                    body>div{
                        min-height: 100vh;
                    }
                `}</style>
            </Container>
        );
    }
}

export default MyApp;


*/