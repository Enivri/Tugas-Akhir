import styled from 'styled-components'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const HomeOption = styled(Card)`
    display: flex;
    align-items: center;
    margin: auto;
    width: 250px;
    height: 300px;
    /* aspect-ratio: 0.85; */
    box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    margin-bottom: 30px;
    @media screen and (max-width: 1440px) {
    width: 200px;
    height: 250px;
    }
    @media screen and (max-width: 480px) {
    width: 200px;
    height: 250px;
    }
`
export const TopCard = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const IconCard = styled.i`
    font-size: 4rem;
`
export const BotCard = styled(Card.Text)`
    width: 100%;
    height: 30%;
    background-color: #E8EAF0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TextCard = styled(Card.Title)`
    font-size: 1rem;
`

export const OptionContainer = styled(Container)`
    margin-top: 50px;
`
export const OptionRow = styled(Row)`
    justify-content: center;
`
export const OptionCol = styled(Col)`
    padding: 0;
`
export const Header = styled(Link)`
    font-size: 2rem;
    margin-top: 50px;
`
