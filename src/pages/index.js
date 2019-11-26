/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Link from '../components/Link';

import Layout from '../components/Layout';



export default function Index({
  data: { allMdx },
}) {
  const posts = allMdx.edges
  return (
    <Layout>
        <p css={css`
          font-size: 2rem;
          margin: 0 3rem 2rem;
        `}>Hi, I'm Jeff and I write software for the web. Currently: JavaScript, React, Node, etc.</p>

        {posts.map(({ node: post }) => (
          <div key={post.id}>
            {/* {post.frontmatter.banner && (
              <Img
                fluid={post.frontmatter.banner.childImageSharp.fluid}
              />
            )} */}

            <h2>
              <Link to={post.fields.urlPath}>
                {post.frontmatter.title}
              </Link>
            </h2>

            {/* <small>{post.frontmatter.date}</small> */}

            <p>{post.excerpt}</p>

            <Link to={post.fields.urlPath}>Continue Reading</Link>
          </div>
        ))}
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            urlPath
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            slug
            categories
            keywords
          }
        }
      }
    }
  }
`;