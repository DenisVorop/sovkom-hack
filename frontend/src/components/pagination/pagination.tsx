import React from 'react'
import styled from 'styled-components/macro'

import PaginationButton from './pagination-button'

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const maxSlicePage = 5

interface IPaginationProps {
    total: number
    page: number
    offset: number
    limit: number
    onPageChange: (num: number, offset: number) => void
}

const Pagination: React.FC<IPaginationProps> = ({
    total = 1,
    page = 1,
    offset = 1,
    limit = 5,
    onPageChange,
}) => {
    const pageCount = React.useMemo(() => Math.ceil(total / limit), [total, limit])
    const howManyButtonsOnSides = 1

    const [lastPageSlice, setLastPageSlice] = React.useState<number[]>([] as number[])

    const slicedPages = React.useMemo(() => {

        if (pageCount <= 5) {
            const arr = [...new Array(pageCount).keys()]
            const newArr = [] as number[]
            arr.map((el, indx) => {
                if (indx !== 0 && indx !== arr.length) {
                    newArr.push(el + 1)
                }
            })
            return newArr
        } else {
            if (page === pageCount) {
                const arr = [...new Array(pageCount).keys()].slice(page - 3, page + 2)
                setLastPageSlice(arr)
                return [...new Array(pageCount).keys()].slice(page - 3, page + 2)
            }

            if (pageCount - 1 === page) {
                const arr = [...new Array(pageCount).keys()].slice(page - 2, page + 2)
                setLastPageSlice(arr)
                return [...new Array(pageCount).keys()].slice(page - 2, page + 2)
            }

            if (1 + howManyButtonsOnSides < page) {
                const arr = [...new Array(pageCount).keys()].slice(page - howManyButtonsOnSides, page + howManyButtonsOnSides + 1)
                setLastPageSlice(arr)
                return [...new Array(pageCount).keys()].slice(page - howManyButtonsOnSides, page + howManyButtonsOnSides + 1)
            }

        }
        return [...new Array(pageCount).keys()].slice(2, 5)
    }, [page, pageCount])

    return (
        <PaginationWrapper>
            {slicedPages.length ?
                <PaginationButton
                    onClick={() => onPageChange(1, offset)}
                    active={page === 1}
                >
                    {1}
                </PaginationButton>
                :
                null}
            {slicedPages.map((num: number, indx: number) => {
                if (num - 1 > howManyButtonsOnSides && !indx) {
                    return (
                        <>
                            <span>...</span>
                            <PaginationButton
                                onClick={() => onPageChange(num, offset)}
                                active={page === num}
                                key={num}
                            >
                                {num}
                            </PaginationButton>
                        </>
                    )
                } else {
                    return (
                        <PaginationButton
                            onClick={() => onPageChange(num, offset)}
                            active={page === num}
                            key={num}
                        >
                            {num}
                        </PaginationButton>
                    )
                }
            })}
            {pageCount > maxSlicePage && pageCount > slicedPages[slicedPages.length - 1] + 1 && (
                <>
                    <span>...</span>
                    <PaginationButton
                        onClick={() => onPageChange(pageCount, offset)}
                        active={page === pageCount}
                    >
                        {pageCount}
                    </PaginationButton>
                </>
            )}

            {pageCount > 5 && page >= pageCount - 2 && (
                <PaginationButton
                    onClick={() => onPageChange(pageCount, offset)}
                    active={page === pageCount}
                >
                    {pageCount}
                </PaginationButton>
            )

            }
        </PaginationWrapper>
    )
}


export default React.memo(Pagination)
