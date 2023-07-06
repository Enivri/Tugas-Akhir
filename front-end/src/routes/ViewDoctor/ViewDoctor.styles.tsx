import { Col } from 'react-bootstrap'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const Wrapper = styled.div`
`
export const Report = styled.div`
    width: 50vw;
    margin: 0 auto;
    margin-top: 100px;

    @media screen and (max-width: 480px) {
    width: 80vw;
}
`
export const ReportTitle = styled.div`
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    margin-top: 10px;
`
export const Label = styled(Form.Label)`
`
export const Control = styled(Form.Control)`
    width: 20vw;
`
export const Group = styled(Form.Group)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
export const SubContent= styled.div`
    margin-left: 30px;
    display: flex;
    
`
export const SubTitle = styled.div`
    margin-bottom: 10px;
`
export const Identity = styled(Row)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
export const ImageDiv = styled(Col)`
    display: flex;
    justify-content: center;
`

export const Pasfoto = styled.img`
    width: 200px;
    aspect-ratio: 1;
    float: center;
        
    @media screen and (max-width: 480px) {
        width: 150px;
    }
`
export const Content= styled.div`
    margin-left: 30px;
    margin-top: 30px;
`
export const Kode= styled.div`
`
export const SubCode= styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 30px;
    margin-bottom: 7px;
`
export const Titlespace = styled.p`
    width: 50%;
`
export const PagePosition = styled.div`
    display: flex;
    flex-direction: left;
    margin-left: 30px;
`

