import React, { useRef, ChangeEvent } from 'react'
import Thumbnail from '../Thumbnail'
import { AddFile, Wrapper } from './InputFile.styles'

type Props = {
    value?: File
    id: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onDelete: (e: React.MouseEvent<Element, MouseEvent>) => void
}

const InputFile: React.FC<Props> = ({ value, id, onChange, onDelete }) => {
    const ref = useRef<HTMLInputElement>(null)

    const onClick = () => {
        if (ref.current) {
            ref.current.click()
        }
    }

    return (
        <Wrapper>
            {
                value ? (
                    <Thumbnail src={value}
                        id={id}
                        onDelete={onDelete}
                        />
                ): (
                    <>
                        <AddFile onClick={onClick}/>
                        <input ref={ref}
                                    type="file" 
                                    id={id}
                                    className="d-none"
                                    onChange={onChange}
                                    />
                    </>
                )
            }
                        
        </Wrapper>
    )
}

export default InputFile