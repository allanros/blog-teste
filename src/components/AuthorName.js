import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const AuthorName = ({authorId}) => {

    const AUTHOR_QUERY = gql`
        query MyQuery3 {
            user(id: "${authorId}", idType: DATABASE_ID) {
                firstName
                lastName
                name
            }
        }
    `

    const {loading, error, data} = useQuery(AUTHOR_QUERY)

    if(loading) return
    if(error) return error

    const authorFirstName = data.user.firstName

    let authorName = data?.user.name

    if(authorFirstName != null) {
        authorName = authorFirstName+' '+data.user.lastName
    }

    return (
        <>
            <p>Por: <span>{authorName}</span></p><br/>
        </>
    )
}