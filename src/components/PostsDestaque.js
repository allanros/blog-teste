import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Link } from 'react-router-dom';
import { CalendarSVG } from "./CalendarSVG";


const POSTS_QUERY = gql`
  query NewQuery {
    posts(first: 1) {
      nodes {
        content
        date
        title
        postId
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        excerpt
        slug
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  const posts = data?.posts.nodes;

  if (loading) return <p>Loading</p>;
  if (error) return <p>Erro</p>;

  return posts.map(
    ({ content, date, title, postId, featuredImage, excerpt, slug }) => {
      const parseDate = new Date(date);
      const formatDate = format(parseDate, "d 'de' MMMM 'de' yyyy", {
        locale: pt,
      });

      const redirectUrl = `/${slug}`

      return (
        <>
          <section className='blog-destaques'>
            <div className="content-destaques" key={postId}>
              <h2 className="title-destaques">Conteúdos em destaque</h2>
              <div style={{ display: "flex", gap: "60px" }}>
                <img
                  src={featuredImage.node.sourceUrl}
                  alt={featuredImage.node.altText}
                />
                <div className="content-post">
                  <div>
                    <div style={{display: 'flex', marginBottom: '30px', gap: '4px'}}>
                      <CalendarSVG />
                      <p className="post-date">{formatDate}</p>
                    </div>
                    
                    <h1>{title}</h1>
                    <div
                      className="excerpt"
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  </div>
                  <Link className="btn-article" to={redirectUrl}>
                    VER ARTIGO COMPLETO
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  );
};

export default Posts;
