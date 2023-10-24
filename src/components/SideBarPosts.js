import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams, Link } from 'react-router-dom';
import { ptBR } from "date-fns/locale";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

const POSTS_QUERY = gql`
query MyQuery2 {
    posts(first: 4) {
        nodes {
            postId
            title
            excerpt
            date
            slug
        }
    }
  }

`;

const SideBarPosts = () => {
    const { slugPost } = useParams();

    const { loading, error, data } = useQuery(POSTS_QUERY);

    const posts = data?.posts.nodes;
    let count = 1;
    const countPlus = () => {
        count++
    }

    const capitalizeString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (loading) return <p>Loading</p>;
    if (error) return <p>Erro: {error}</p>;

    
    return posts.map(({postId, title, excerpt, date, slug}, index) => {
        const parseDate = parseISO(date);
        const formattedTime = formatDistanceToNow(parseDate, {addSuffix: true, locale: ptBR})
        
        const redirectUrl = `/${slug}`;
        
        if(slug === slugPost || index === 4) {
            return null;
        }

        return (
            <>
            <div className="sidebar-content">
                <div className="counter"><p>{count}</p></div>
                <div className="sidebar-text-content">
                    <Link to={redirectUrl}><h3>{title}</h3></Link>
                    <div className="sidebar-excerpt">
                        <div  dangerouslySetInnerHTML={{__html: excerpt}}/>
                        <div className="post-time">
                            <p>{capitalizeString(formattedTime)}</p>
                        </div>
                    </div>
                </div>
            </div>
            {countPlus()}
            </>
        )
    })
}

export default SideBarPosts