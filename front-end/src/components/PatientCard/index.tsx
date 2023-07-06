import React from 'react'
import {Wrapper, CodeCard, Content, Date, Right, Left, Kondisi } from './PatientCard.styles'


interface CardParams {
    date: string
    viewlink: string
    right: string
    left: string
}

const CodeCardComponent: React.FC<CardParams> = ({date, viewlink, right, left}) => {
    return (
    <Wrapper>
        <CodeCard to={viewlink}>
            <Content>
                <Date>
                    {date}
                </Date>
                <Kondisi>
                    <Right>
                    <p>Kondisi Mata Kanan:</p>
                    <p>{right}</p>
                    </Right>
                    <Left>
                    <p>Kondisi Mata Kiri:</p>
                    <p>{left}</p>   
                    </Left>
                </Kondisi>
            </Content>
        </CodeCard>
    </Wrapper>
    )
}   

export default CodeCardComponent