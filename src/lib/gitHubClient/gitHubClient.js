import axios from 'axios';
import _ from 'lodash';

const gitHubUrl = 'https://api.github.com';

const createGitHubClient = function createGitHubClient() {
    async function fetchData(url) {
        return await axios.get(url)
            .catch(({ response: { status } }) => {
                const message = _.isEqual(status, 404) ?
                    `Not found.` :
                    'Something went wrong while talking to GitHub.'

                return Promise.reject({ message, status });
            })
    }

    async function getUser(userName) {
        if (!userName) {
            throw new TypeError('Must provide a user name.');
        }

        const { data } = await fetchData(`${gitHubUrl}/users/${userName}`);

        return {
            user: data
        };
    }

    async function searchUsers(queryString) {
        if (!queryString) {
            throw new TypeError('Must provide a query string.');
        }

        const { data: { items } } = await fetchData(`${gitHubUrl}/search/users?q=${queryString}`);

        return {
            users: items
        };
    }

    return {
        getUser,
        searchUsers
    };
}

export default createGitHubClient();
