import styled from "styled-components";


export const StyledFriend = styled.li`
    display:${({ visible }) => visible ? 'flex' : 'none'};
    align-items:center;
    padding:4px;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    border-radius: 0.375rem;
    height:60px;
    margin-bottom:8px;
img{
    height: 40px;
    width: 40px;
    box-shadow: var(--shadow2);
    border-radius: 50px;
    margin-right: var(--m-margin);
}
.new-message{
    margin-left: var(--s-margin);
    background: #31f75c;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50px;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    display:${({ newMsg }) => newMsg > 0 ? 'block' : 'none'}
}
.last-msg{
    margin: var(--s-margin);
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 45%;
    max-width: 100px;
}

`