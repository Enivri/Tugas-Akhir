import styled from "styled-components";

export const Wrapper = styled.div`
    width: 150px;
    aspect-ratio: 1;
    overflow: hidden;
    position: relative;
`

export const Image = styled.img`
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    cursor: pointer;
`

export const DeleteButton = styled.p`
    position: absolute;
    right: 0;
    top: 0;
    width: 25px;
    aspect-ratio: 1;
    background-color: red;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    cursor: pointer;
    user-select: none;
`
