import styled from "styled-components";


export const StyledMessage = styled.li`
position: relative;
border-radius: var(--m-radius);
font-size: 18px;
min-height: 60px;
line-height: 30px;
display: flex;
align-items: center;
justify-content: space-between;
width: 85%;
margin: var(--m-margin);
padding: 0 var(--m-padding);
color: #333;
word-break: break-all;
z-index: 2;

box-shadow:${({ className }) => className === 'end' ? '' : '0 0px 4px rgba(169, 169, 169, 0.16), 0 0px 4px rgb(78 78 78 / 25%)'};
background-color:${({ type }) => type === 'type-0' ? '#cae0ff;' : '#fff'};
float:${({ type }) => type === 'type-0' ? 'right;' : '#left'};

`