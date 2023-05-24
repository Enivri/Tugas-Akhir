import React from 'react'
import { DeleteButton, Image, Wrapper } from './Thumbnail.styles'

type Props = {
    id: string
    src: File
    onDelete?: (e: React.MouseEvent<Element, MouseEvent>) => void
}

const Thumbnail: React.FC<Props> = ({ id, src, onDelete }) => {
    return (
        <Wrapper>
            <Image src={URL.createObjectURL(src)} alt="thumbnail=image" />
            {
                onDelete && (
                    <DeleteButton id={id} onClick={onDelete}>X</DeleteButton>
                )
            }
        </Wrapper>
    )
}

export default React.memo(Thumbnail)