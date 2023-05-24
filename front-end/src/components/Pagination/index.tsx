import { Wrapper } from './Pagination.styles'
import Pagination from 'react-bootstrap/Pagination';

type Props = {
    currentPage: number
    hasPrevPage: boolean
    hasNextPage: boolean
    onClick: React.Dispatch<React.SetStateAction<number>>
}

const Page: React.FC<Props> = ({ currentPage, hasNextPage, hasPrevPage, onClick }) => {
    return (
        <Wrapper>
            <Pagination.Prev onClick={() => onClick((prev: number) => prev - 1)} disabled={!hasPrevPage} />
            { hasPrevPage && (<Pagination.Item onClick={() => onClick((prev: number) => prev - 1)}>{currentPage - 1}</Pagination.Item>) }
            <Pagination.Item active>{currentPage}</Pagination.Item>
            { hasNextPage && (<Pagination.Item onClick={() => onClick((prev: number) => prev + 1)}>{currentPage + 1}</Pagination.Item>) }
            <Pagination.Next onClick={() => onClick((prev: number) => prev + 1)} disabled={!hasNextPage}/>
        </Wrapper>
    );
}


export default Page