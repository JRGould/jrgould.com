/** @jsx jsx */
import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import useSiteMetadata from '../hooks/use-sitemetadata';

import 'prismjs/themes/prism-okaidia.css';

import Link from './Link';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';

const NavLinkBase = props => {
  const isLinkActivePage = props => {
    console.log(props);
    const {isPartiallyCurrent, isCurrent, href} = props;
    if (href === "/") {
      return isCurrent ? {"aria-current": true} : null;
    }
    return isPartiallyCurrent ? {"aria-current": true} : null
  }

  return <Link getProps={isLinkActivePage} {...props} />
}

const NavLink = styled(NavLinkBase)`
    display: block;
    border-left: 20px solid red!important;
`

const globalStyle = css`
  @import url("https://fonts.googleapis.com/css?family=Raleway:300,400");

  html, body {
    --primary-color: rgb(255,213,86);
    --primary-color-light: rgba(255,200,30,.50);
    --primary-color-lighter: rgba(255,200,30,.20);

    --secondary-color: rgba(30, 255, 155, 0.75);
    --secondary-color-light: rgba(30, 255, 155, 0.50);
    --secondary-color-lighter: rgba(30, 255, 155, 0.20);

    --content-width: 54rem;
    --site-border-size: 16px;

    margin: 0;
    padding: 0;
    background: #fff;
    min-height: 100vh;
    margin: 0;

    font-family: Raleway, Helvetica Neue, sans-serif;
    &, *{
      position: relative;
      box-sizing: border-box;
    }
  }

  picture{
    position: static;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }


  body {
    border-left: var(--site-border-size) solid var(--primary-color);
    border-right: var(--site-border-size) solid var(--primary-color);
    padding: 0;
  }
  body:before, body:after {
    content: "";
    position: fixed;
    background-color: var(--primary-color);
    left: var(--site-border-size);
    right: var(--site-border-size);
    height: var(--site-border-size);
    z-index: 9999;
  }
  body:before {
      top: 0;
  }
  body:after {
      bottom: 0;
  }


  #___gatsby{
    display: flex;
    min-height: 99vh;
    flex-direction: column;
  }

  .site-wrapper {
    max-width: var(--content-width);
    margin: 0 auto;
    padding-bottom: 3rem;
  }

  a{
    background-color: var(--primary-color-lighter);
    color: #333;
    text-decoration: none;
    transition: background-color .3s ease-out;
    &:hover{
    background-color: var(--primary-color-light);
    }
  }

`;

const SiteHeader = styled.header`
  padding: var(--site-border-size) 1rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;

  h1 {
    margin: 0;
    a{
      display: inline-block;
      padding: 0 .5rem;
      background-color: var(--primary-color);
      --triangle-size: 1.15em;
      &:before{
        content: '';
        border-left: var(--triangle-size) solid transparent;
        border-top: var(--triangle-size) solid var(--primary-color);
        position: absolute;
        right: 100%;
        bottom: 0;
      }
      &:after{
        content: '';
        border-right: var(--triangle-size) solid transparent;
        border-top: var(--triangle-size) solid var(--primary-color);
        position: absolute;
        left: 100%;
        bottom: 0;
      }
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    li {
      display: inline-block;
      margin-left: 1rem;
      font-size: 1.3rem;
    }
  }
`;

const NAVIGATION = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
];

export default ({ frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = useSiteMetadata();

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <React.Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <Global styles={globalStyle} />

      <MDXProvider
        components={{
          ...MDXLayoutComponents,
          ...MDXGlobalComponents,
        }}
      >
        <div className="site-wrapper">
          <SiteHeader>
            <h1><Link to="/">Jeff Gould</Link></h1>
            <ul css={css`
              list-style: none;
            `}>
              {NAVIGATION.map(navigation => (
                <li key={navigation.label}>
                  <NavLink to={navigation.to}>{navigation.label}</NavLink>
                </li>
              ))}
            </ul>
          </SiteHeader>

          {children}
        </div>
      </MDXProvider>
    </React.Fragment>
  );
};

