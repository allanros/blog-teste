import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from 'react-router-dom';
import { CalendarSVG } from "./CalendarSVG";

const POSTS_QUERY = gql`
  query MyQuery2 {
    posts(first: 4) {
      nodes {
        content
        postId
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
  }
`;

const RelatedPosts = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  const posts = data?.posts.nodes;

  if (loading) return <p>Loading</p>;
  if (error) return <p>Erro</p>;

  return posts.map(
    (
      {
        postId,
        title,
        excerpt,
        date,
        featuredImage,
        slug,
      },
      index
    ) => {
      if (index === 0) {
        return null;
      }
      const parseDate = new Date(date);
      const formatDate = format(parseDate, "d 'de' MMMM 'de' yyyy", {
        locale: pt,
      });

      const redirectUrl = `/${slug}`

      return (
        <>
          <div className="related-posts-card">
            <div className="related-post-image">
              <Link to={redirectUrl} >
              <img
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText}
              />
              </Link>
            </div>
						<div className="related-post-content2">
              <div style={{display: 'flex', gap: '4px', paddingLeft: '12px'}}>
                <CalendarSVG />
                <p className="related-post-date" style={{fontSize: '12px', alignSelf: 'center'}}>{formatDate}</p>
              </div>
							<div className="related-post-content">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '70%'}}>
                  <h2>{title}</h2>
                  <div className="related-post-excerpt" dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                </div>
                <Link to={redirectUrl}>Ver artigo completo &gt;</Link>
							</div>
						</div>
          </div>
        </>
      );
    }
  );
};

export default RelatedPosts;
