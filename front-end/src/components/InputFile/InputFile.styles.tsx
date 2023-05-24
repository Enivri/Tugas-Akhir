import styled from "styled-components";

export const Wrapper = styled.div`
    width: 70%;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-template-rows: repeat(auto-fill, 150px);
`

export const AddFile = styled.div`
    width: 150px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 25px;
    border: 1px black dashed;
    position: relative;
    cursor: pointer;
    &::after{
        content: '+';
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`