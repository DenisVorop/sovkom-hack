import React from 'react'
import styled from 'styled-components/macro'

interface ITableProps {
    borderColor?: string
    stickyHead?: string
    headColor?: string
}

const Table = styled.table<ITableProps>`
    width: 100%;
    border-spacing: 0;
    * {
        ${({ borderColor }) => {
        return borderColor && {
            borderColor: `${borderColor}!important`,
        }
    }}
    }
    thead {
        tr {
            th {
                ${({ stickyHead, theme}) => stickyHead && {
        position: 'sticky',
        top: '0',
        background: theme.colors.bg.muted,
    }}
                :first-child {
                    border-left: 1px solid ${({ theme }) => theme.colors.border.default};
                }
                border: 1px solid ${({ theme }) => theme.colors.border.default};
                border-left: none;
                color: ${({ theme }) => theme.colors.bg.subtle};

                text-align: left;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                padding: 4px 8px;
            }
        }
    }
    tbody {
        tr {
            td {
                :first-child {
                    border-left: 1px solid ${({ theme }) => theme.colors.border.default};
                }
                border: 1px solid ${({ theme }) => theme.colors.border.default};
                border-left: none;
                border-top: none;

                text-align: left;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                padding: 4px 8px;
            }
        }
    }
    tfoot {
        tr {
            background-color: ${({ theme }) => theme.colors.bg.muted};
            td {
                text-align: left;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                padding: 4px 8px;
            }
        }
    }
`

export default React.memo(Table)
