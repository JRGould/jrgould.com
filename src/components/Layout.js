/** @jsx jsx */
import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { Global, css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { siteMetadata } from '../../gatsby-config';

import useSiteMetadata from '../hooks/use-sitemetadata';

import 'prismjs/themes/prism-okaidia.css';

import LayoutHeader from './Layout-Header';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';
import runCanvas from './canvas-bg';

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css?family=Raleway:300,400');

  :root {
    --primary-color: rgb(255, 213, 86);
    --primary-color-light: rgba(255, 200, 30, 0.5);
    --primary-color-lighter: rgba(255, 200, 30, 0.2);

    --text-color: #555555;
    --code-bgcolor: #373f46;
    --code-bgcolor-light: #eee;

    --content-width: ${siteMetadata.contentWidth}px;
    --site-border-size: 0rem;
    --content-inset: 2rem;

    --standard-transition-duration: 0.3s;
    --standard-transition-easing: ease-out;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    min-height: 100vh;
    margin: 0;

    font-family: Raleway, Helvetica Neue, sans-serif;
    &,
    * {
      position: relative;
      box-sizing: border-box;
    }
  }

  picture {
    position: static;
  }

  /* Override PrismJS Defaults */
  div[data-language] {
    margin-left: calc(-1 * var(--content-inset));
    margin-right: calc(-1 * var(--content-inset));

    pre {
      border-radius: 0px;
      font-size: 13px;
      background-color: var(--code-bgcolor);
    }

    .gatsby-highlight-code-line {
      background-color: #444;
      display: block;
      margin-right: -1em;
      margin-left: -1em;
      padding-right: 1em;
      padding-left: 1em;
    }
  }
  /* PrismJS inline code override */
  :not(pre) > code[class*='language-'] {
    background-color: var(--code-bgcolor-light);
    color: var(--text-color);
    font-size: 0.8em;
    padding: 0.1em 0.4em 0.2em;
    border-radius: 0;
    text-shadow: none;
  }

  body {
    border-left: var(--site-border-size) solid var(--primary-color);
    border-right: var(--site-border-size) solid var(--primary-color);
    padding: 0;
  }

  body:before,
  body:after {
    content: '';
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

  #___gatsby {
    display: flex;
    min-height: 99vh;
    flex-direction: column;
  }

  .site-wrapper {
    max-width: var(--content-width);
    margin: 0 auto;
    padding-bottom: 3rem;
  }
  a {
    background-color: var(--primary-color-lighter);
    color: #333;
    text-decoration: none;
    transition: background-color var(--standard-transition-duration)
      var(--standard-transition-easing);
    &:hover {
      background-color: var(--primary-color-light);
    }
  }
`;

const ContentWrapper = styled.div`
  padding: var(--content-inset);
  padding-top: 0;
`;

export default ({ frontmatter = {}, children }) => {
  const { title, description: siteDescription, keywords: siteKeywords } = useSiteMetadata();

  const { keywords: frontmatterKeywords, description: frontmatterDescription } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  const canvasRef = React.useRef();
  React.useEffect(() => {
    const timeout = runCanvas(canvasRef.current);
    return () => {
      clearTimeout(timeout);
    };
  }, [canvasRef]);

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
          <LayoutHeader />
          <ContentWrapper>{children}</ContentWrapper>
        </div>
        <div
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
          `}
        >
          <canvas
            ref={canvasRef}
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100vmax;
              height: 100vmax;
            `}
          />
        </div>
      </MDXProvider>
    </React.Fragment>
  );
};
