import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Link from '../components/Link';

const Categories = ({ categories }) => (
  <Fragment>
    <ul>
      {categories.map(category => (
        <li key={category}>
          <Link to={`/categories/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

const Blog = ({ data: { allMdx }, pageContext: { pagination, categories } }) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts = page.map(id => allMdx.edges.find(edge => edge.node.id === id));

  return (
    <Layout>
      <div>
        All categories on the blog: <Categories categories={categories} />
      </div>

      {posts.map(({ node: post }) => (
        <div key={post.id}>
          {post.frontmatter.banner && <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />}

          <h2>
            <Link to={post.fields.urlPath}>{post.frontmatter.title}</Link>
          </h2>

          <small>{post.frontmatter.date}</small>

          <p>{post.excerpt}</p>

          <Link to={post.frontmatter.slug}>Continue Reading</Link>
        </div>
      ))}

      {(nextPagePath || previousPagePath) && (
        <div>
          Pagination:
          <ul>
            {nextPagePath && (
              <li>
                <Link to={nextPagePath}>Next Page</Link>
              </li>
            )}

            {previousPagePath && (
              <li>
                <Link to={previousPagePath}>Previous Page</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Blog;

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
