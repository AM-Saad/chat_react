import styled from "styled-components";

export const StyledSendButton = styled.button`

    position: relative;
    display: flex;
    align-items: center;
    color: #353535;
    background: transparent;
    border: none;
    font-family: inherit;
    padding: 0;
    border-radius: 1rem;
    font-size: 1.2rem;
    font-variation-settings: "wght" 500;
    cursor: pointer;
    transition: transform 0.4s ease-out;

  &:hover .icon svg {
    transform: translate(-5px, 5px);
  }
  
.text {
    padding: 1rem 1rem 1rem 2rem;
  }
  
  .icon {
    display: block;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
  }
  
  svg {
    fill: currentColor;
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.4s ease-out;
  }
`