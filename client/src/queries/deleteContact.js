import qgl from 'graphql-tag';

export const DELETE_CONTACT = qgl`
    mutation deleteContact($id: String!) {
        deleteContact(id: $id) {description}
    }
`
