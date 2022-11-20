import React from 'react'
import styled from 'styled-components/macro'

import { textVariant } from '../../libs/consts'
import Counter from '../counter/counter'

import Input from '../input/input'
import Text from '../text/text'

interface IWidth {
    w?: string
}

const Wrapper = styled.div<IWidth>`
    width: ${({ w }) => w ? w : '100%'};
`
const Label = styled(Text)`
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.fg.default};
`
const Content = styled.div`
    display: flex;
    align-items: center;
`

const StyledInput = styled(Input) <IWidth>`
    width: ${({ w }) => w && w};
`


interface IInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder?: string
    label?: string
    type?: string
    disabled?: boolean
    w?: string
    min?: string
    max?: string
    counter?: boolean
    name?:string
}

const InputWithLabel: React.FC<IInputProps> = ({
    onChange,
    value,
    placeholder,
    label,
    type = 'text',
    disabled,
    w,
    counter = false,
    name,
}) => {
    return (
        <Wrapper w={w}>
            {label && <Label variant={textVariant.T2}>{label}</Label>}
            <Content>
                {counter
                    ? <Counter
                        value={value}
                        onChange={onChange}
                    />
                    : <StyledInput
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        w={w}
                        name={name}
                    />
                }
            </Content>
        </Wrapper>
    )
}

export default React.memo(InputWithLabel)
