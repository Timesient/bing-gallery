import { useState, useEffect } from "react";
import styled from "styled-components";
import { ArrowUpIcon } from "@primer/octicons-react";

const Root = styled.button`
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #7FFFD4;
  color: #000;
  cursor: pointer;
`;

export default function ToTopButton() {
  const [currentScrollY, setCurrentScrollY] = useState(0);

  // registry 'scroll' event listener
  useEffect(() => {
    const onScrollHandler = () => setCurrentScrollY(window.scrollY);
    window.addEventListener('scroll', onScrollHandler);

    return () => window.removeEventListener('scroll', onScrollHandler);
  }, []);

  return currentScrollY <= 2000 ? <></> : <Root onClick={() => (window && window.scrollTo(0, 0))}><ArrowUpIcon /></Root>
}