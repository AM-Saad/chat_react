import styled from 'styled-components'

export const StyledOnlineIcon = styled.span`
    height: 15px;
    width: 15px;
    background: ${({ online }) => online ? '#38ff2f' : '#888'};
    border-radius: 50px;
    position: absolute;
    bottom: -4px;
    left: 3px;
    border: 2px solid #fff;

`