/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      about
      phone
      address
      user_Id
      image
      facebook_API
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBusinesses = /* GraphQL */ `
  query ListBusinesses(
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        about
        phone
        address
        user_Id
        image
        facebook_API
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
