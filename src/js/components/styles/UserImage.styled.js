import styled from "styled-components";

export const StyledUserImage = styled.img`
  height: ${({fullscreen}) => fullscreen ? '80%' : '40px'};
  width: ${({fullscreen}) => fullscreen ? 'unset' : '40px'};
  box-shadow: var(--shadow2);
  border-radius: ${({fullscreen}) => fullscreen ? '' : '50px' };
  margin-right: 10px;
    position:${({fullscreen}) => fullscreen? 'absolute' : 'unset'};
    left:${({fullscreen}) => fullscreen? '50%' : 'unset'};
    top:${({fullscreen}) => fullscreen? '50%' : 'unset'};
    transform:${({fullscreen}) => fullscreen? 'translate(-50%, -50%)' : 'unset'};
    z-index:10;
    transition:.5s all ease-in-out;
    cursor:pointer
`