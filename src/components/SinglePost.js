import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import SideBarPosts from "./SideBarPosts";
import { Socials } from "./Socials";
import { AuthorName } from "./AuthorName";
import { format } from "date-fns";

const SinglePost = () => {
    
    const { slugPost } = useParams();
    
    const POSTS_QUERY = gql`
        query MyQuery2 {
            post(id: "${slugPost}", idType: SLUG) {
            author {
                node {
                databaseId
                }
            }
            categories {
                nodes {
                name
                }
            }
            date
            content
            featuredImage {
                node {
                sourceUrl
                }
            }
            slug
            }
        } 
    `

    const { loading, error, data } = useQuery(POSTS_QUERY);
    const post = data?.post;

    if (loading) return <p>Loading</p>;
    if (error) return <p>Erro</p>;
    
    const { featuredImage, date, content, author, categories } = post
    
    const postCategories = () => {
        return categories.nodes.map(({name}, index) => {
            const className = `category-card category-${index}`

            return (
                <>
                    <div className={className}>{name}</div>
                </>
            )
        })
    }

    const oldDate = new Date(date)
    const formatDate = format(oldDate, "dd/mm/yyyy")

    
    return(
        <>
            <div className="post-categories">{postCategories()}</div>
            <div className="full-content">
                <div className="post-content">
                    <div className="post-image">
                        <img src={featuredImage.node.sourceUrl}/>
                    </div>
                    <div style={{color: "#333", fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '300'}}>
                        <div className="author-name">
                            <AuthorName authorId={author.node.databaseId}/>
                        </div>
                        <p>{formatDate}</p><br/>
                    </div>
                    <Socials />
                    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div className="sidebar">
                    <h2>Outros Artigos</h2>
                    <SideBarPosts />
                </div>
            </div>
        </>
    )


}

export default SinglePost;