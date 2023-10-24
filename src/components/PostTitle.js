import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const PostTitle = (slugPost) => {
    const POSTS_QUERY = gql`
        query MyQuery {
            post(id: "${slugPost.slugPost}", idType: SLUG) {
                title
            }
        }
    `

    const { loading, error, data } = useQuery(POSTS_QUERY)

    if (loading) return <p>Loading</p>;
    if (error) return;

    let postTitle = slugPost.slugPost;

    if(data.post != null) {
        postTitle = data.post.title
    }

    return (
        <>
            {postTitle}
        </>
    )
}

export default PostTitle