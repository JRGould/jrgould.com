/** @jsx jsx */
import { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import {jsx} from '@emotion/core';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import Layout from '../components/Layout';
import Link from '../components/Link';
import useSiteMetadata from '../hooks/use-sitemetadata';

const CategoryList = ({ list = [] }) => (
  <Fragment>
    Categories:
    <ul>
      {list.map(category => (
        <li key={category}>
          <Link to={`/categories/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

export default function Post({
  data: { mdx },
  pageContext: { next, prev },
}) {
  const siteMetadata = useSiteMetadata();
  return (
    <Layout frontmatter={mdx.frontmatter}>
      <h1>{mdx.frontmatter.title}</h1>
      <h2>{mdx.frontmatter.date}</h2>

      {mdx.frontmatter.banner && (
        <Img
          fluid={mdx.frontmatter.banner.childImageSharp.fluid}
          alt={siteMetadata.keywords.join(', ')}
        />
      )}

      <MDXRenderer>{mdx.body}</MDXRenderer>

      <div>
        <CategoryList list={mdx.frontmatter.categories} />

        <hr />

        {prev && (
          <span>
            Previous{' '}
            <Link to={prev.fields.urlPath}>{prev.fields.title}</Link>
          </span>
        )}
        {next && (
          <span>
            Next{' '}
            <Link to={next.fields.urlPath}>{next.fields.title}</Link>
          </span>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
        categories
        keywords
      }
      body
    }
  }
`;
