import qgl from 'graphql-tag';

export const GET_ALL_CONTACTS = qgl`
    query contacts {
        contacts {
            id,
            name,
            company {id, name},
            contactLines {id, value}
        }
    }
`
