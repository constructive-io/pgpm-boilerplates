
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import fetch from 'cross-fetch';

// example GQL
const GetUsers = gql`
  query GetUsers {
    users {
      nodes {
        id
        username
      }
    }
  }
`;

export default async (params: any, context: any) => {
    const { client } = context;
    console.log('Function received', params);

    // Proof of GQL connection
    let users = null;
    try {
        const data = await client.request(GetUsers);
        users = data?.users;
    } catch (e: any) {
        console.warn('GQL Request failed (expected if server not reachable in test):', e.message);
    }

    return {
        message: 'Hello World',
        received: params,
        users
    };
};


// Server boilerplate abstracted to runner.js
