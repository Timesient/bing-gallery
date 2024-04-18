import { useState, useEffect, useRef, Key } from "react";
import styled from "styled-components";
import { ChevronDownIcon } from "@primer/octicons-react";

const Root = styled.div`
  position: relative;
  margin: 0 4px;
`;

const CurrentOption = styled.span`
  padding: 8px 6px 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 700px) {
    & { font-size: 14px; }
  }
`;

const DownIcon = styled(ChevronDownIcon)<{ $isOpening: boolean }>`
  transform: rotate(${ props => props.$isOpening ? '180deg' : '0deg' });
  transition: transform 0.2s;
`;

const OptionContainer = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  z-index: 10;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  transform: translateX(-50%);
`;

const Option = styled.span`
  width: 100%;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  text-wrap: nowrap;
  &:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  @media (max-width: 700px) {
    & { font-size: 14px; }
  }
`;

export default function Selector({
  defaultOption,
  options,
  optionOnClickHandler
} : {
  defaultOption: string,
  options: string[],
  optionOnClickHandler: Function
}) {
  const currentOptionElementRef = useRef(null);
  const [currentOptionText, setCurrentOptionText] = useState(defaultOption);
  const [isOpening, setIsOpening] = useState(false);

  // registry global click handler
  useEffect(() => {
    function clickHandler(event: MouseEvent) {
      let target = event.target as HTMLElement;
      if (target.tagName === 'path' && target.parentElement && target.parentElement.parentElement) target = target.parentElement.parentElement;
      if (target.tagName === 'svg' && target.classList.toString().includes('Selector__DownIcon') && target.parentElement) target = target.parentElement;
      if (target === currentOptionElementRef.current) return;
      setIsOpening(false);
    }

    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);

  // handle options clicked
  function handleOptionOnClick(option: string) {
    if (option === currentOptionText) return;
    setCurrentOptionText(option);
    optionOnClickHandler(option);
  }
  
  return (
    <Root>
      <CurrentOption onClick={() => setIsOpening(true)} ref={currentOptionElementRef}>
        { currentOptionText }
        <DownIcon size={18} $isOpening={isOpening} />
      </CurrentOption>
      { isOpening && (
          <OptionContainer>
            {
              options.map((option: string, index: Key) => (
                <Option key={index} onClick={() => handleOptionOnClick(option)}>{option}</Option> 
              ))
            }
          </OptionContainer>
        )
      }
    </Root>
  );
}