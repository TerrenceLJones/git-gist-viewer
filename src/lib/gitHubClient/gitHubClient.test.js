import axios from 'axios';
import gitHubClient from './gitHubClient';

const mockAxiosGet = jest.spyOn(axios, 'get');

describe('gitHubClient', () => {
    beforeEach(() => {
        mockAxiosGet.mockReset();
    });

    describe('getUser', () => {
        const testUserName = 'TerrenceLJones';

        it('returns api response as user object', async () => {
            const userData = { id: 1 };
            mockAxiosGet.mockReturnValue(Promise.resolve({ data: userData }));
            const expected = { user: userData };
            const returnValue = await gitHubClient.getUser(testUserName);
            expect(returnValue).toEqual(expected);
        });

        it('throws error when userName is undefined', async () => {
            let errorMessage;
            try {
                await gitHubClient.getUser();
            } catch ({ message }) {
                errorMessage = message;
            }
            expect(errorMessage).toMatch(/provide a user name/);
        });

        it('handles when user is not found', async () => {
            mockAxiosGet.mockReturnValue(Promise.reject({ response: { status: 404 } }));
            try {
                await gitHubClient.getUser(testUserName);
            } catch ({ message }) {
                expect(message).toMatch(/Not found/);
            }
        });

        it('handles api errors', async () => {
            mockAxiosGet.mockReturnValue(Promise.reject({ response: { status: 500 } }));
            try {
                await gitHubClient.getUser(testUserName);
            } catch ({ message }) {
                expect(message).toMatch(/Something went wrong/);
            }
        });
    });

    describe('searchUsers', () => {
        const queryString = 'abcdef';

        it('returns api response as users array', async () => {
            const usersData = [{ id: 1, id: 2 }];
            mockAxiosGet.mockReturnValue(Promise.resolve({ data: { items: usersData } }));
            const expected = { users: usersData };
            const returnValue = await gitHubClient.searchUsers(queryString);
            expect(returnValue).toEqual(expected);
        });

        it('throws error when queryString is undefined', async () => {
            let errorMessage;
            try {
                await gitHubClient.searchUsers();
            } catch ({ message }) {
                errorMessage = message;
            }
            expect(errorMessage).toMatch(/provide a query string/);
        });

        it('handles api errors', async () => {
            mockAxiosGet.mockReturnValue(Promise.reject({ response: { status: 500 } }));
            try {
                await gitHubClient.searchUsers(queryString);
            } catch ({ message }) {
                expect(message).toMatch(/Something went wrong/);
            }
        });
    });
});
