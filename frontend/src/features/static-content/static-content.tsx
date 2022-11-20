import React from 'react'
import styled from 'styled-components'
import isEqual from 'lodash/isEqual'

import { useContentRenderer } from '../../hooks/use-render'

const RenderStaticWrapper = styled.span`
    .p {
        font-size: 14px;
        color: red;
    }
    .title {
        font-size: 18px;
        color: green;
    }
    ul li {
        list-style: disc;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        img {
            width: 250px;
            height: 250px;
        }
    }
`

interface IContent {
    text: string
}
interface IRenderProps {
    content: IContent[]
    view?: any
}

const RenderStatic: React.FC<IRenderProps> = ({ content = [], view }) => {
    const { r } = useContentRenderer()
    const renderedContents = React.useMemo(() => {
        return content.map(
            (obj: IContent, idx: number) =>
                obj?.text && (
                    <RenderStaticWrapper key={idx}>
                        {r(obj.text, view)}
                    </RenderStaticWrapper>
                ),
        )
    }, [content])
    return <>{renderedContents}</>
}

function compareFunc(props1: { content: IContent[] }, props2: { content: IContent[] }): boolean {
    return isEqual(props1?.content, props2?.content)
}

export default React.memo(RenderStatic, compareFunc)
