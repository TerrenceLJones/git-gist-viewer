import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = () => <span>Git Gist Viewer main App</span>;

const PageManager = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    );
}

export default PageManager;