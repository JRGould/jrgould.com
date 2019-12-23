import styled from '@emotion/styled';

export default styled.div`
  border: 0.5rem solid var(--primary-color);
  padding: 2rem;
  margin: 1em calc(-1 * var(--content-inset));
  :before {
    ${({ name }) => (name ? '' : 'display: none;')}
    content: ${({ name }) => `"${name}"`};
    position: absolute;
    
    top: 0;
    left: 0;
    background: var(--primary-color);
    padding: 0.1rem 0.3rem 0.2rem;
    font-family: monospace;
    color: #333;
  }
`;
