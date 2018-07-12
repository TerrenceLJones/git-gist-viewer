import { branch, compose, renderComponent } from 'recompose';

const nonOptimalStates = (states) => {
    return compose(...states.map(state => {
        return branch(state.when, renderComponent(state.render))
    }));
}

export {
    nonOptimalStates
};