import React from 'react'
import {Wrapper, CodeCard, Content, Code, Date } from './CodeCard.styles'


interface CardParams {
    code: string
    date: string
    viewlink: string
}

const CodeCardComponent: React.FC<CardParams> = ({code, date, viewlink}) => {
    return (
    <Wrapper>
    <CodeCard to={viewlink}>
        <Content>
            <Date>
                {date}
            </Date>
            <Code>
                {code}
            </Code>
        </Content>
    </CodeCard>
    </Wrapper>
    )
}   

export default CodeCardComponent