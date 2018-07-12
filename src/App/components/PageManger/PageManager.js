import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchResults from 'App/Pages/SearchResults';

const Home = () => <span>Git Gist Viewer main App</span>;

const PageManager = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={SearchResults} />
        </Switch>
    );
}

export default PageManager;