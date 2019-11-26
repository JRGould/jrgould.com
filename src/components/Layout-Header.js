/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './Link';

const NAVIGATION = [
  { to: '/', label: 'Home' },
  { to: '/posts', label: 'Posts' },
];

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
    a {
      display: inline-block;
      padding: 0 0.5rem;
      background-color: var(--primary-color);
      --triangle-size: 1.15em;
      &:before {
        content: '';
        border-left: var(--triangle-size) solid transparent;
        border-top: var(--triangle-size) solid var(--primary-color);
        position: absolute;
        right: 100%;
        bottom: 0;
      }
      &:after {
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
      /* margin-left: 1rem; */
      font-size: 1.3rem;
    }
  }
`;

const NavLinkBase = props => {
  const isLinkActivePage = props => {
    const { isPartiallyCurrent, isCurrent, href } = props;
    if (href === '/') {
      return isCurrent ? { 'aria-current': true } : null;
    }
    return isPartiallyCurrent ? { 'aria-current': true } : null;
  };

  return <Link getProps={isLinkActivePage} {...props} />;
};

const NavLink = styled(NavLinkBase)`
  --link-color: var(--primary-color);
  display: block;
  padding: 0.2em 1em;
  background-color: var(--link-color);
  --triangle-size: 1.6em;
  /* &:before{
      content: '';
      border-left: var(--triangle-size) solid transparent;
      border-bottom: var(--triangle-size) solid var(--link-color);
      position: absolute;
      right: 100%;
      bottom: 0;
      transition: border-color var(--standard-transition-duration) var(--standard-transition-easing);
    }
    &:after{
      content: '';
      border-right: var(--triangle-size) solid transparent;
      border-top: var(--triangle-size) solid var(--link-color);
      position: absolute;
      left: 100%;
      bottom: 0;
      transition: border-color var(--standard-transition-duration) var(--standard-transition-easing);
    }

    &:hover{
      --link-color: var(--primary-color-light);
      background-color: var(--link-color);
    } */
`;

export default () => (
  <SiteHeader>
    <h1>
      <Link to="/">Jeff Gould</Link>
    </h1>
    <ul
      css={css`
        list-style: none;
      `}
    >
      {false &&
        NAVIGATION.map(navigation => (
          <li key={navigation.label}>
            <NavLink to={navigation.to}>{navigation.label}</NavLink>
          </li>
        ))}
    </ul>
  </SiteHeader>
);
