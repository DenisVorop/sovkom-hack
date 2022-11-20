import React from 'react'
import styled from 'styled-components/macro'

const CKEditorWrapper = styled.div`
    .ck {
        border-color: ${({ theme }) => theme.colors.border.default}!important;
        .ck-toolbar {
            background: ${({ theme }) => theme.colors.bg.muted};
            border-bottom: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
            border-radius: 4px 4px 0px 0px;
            svg path {
                fill: ${({ theme }) => theme.colors.fg.default}!important;
            }
        }
        .ck-editor__main>.ck-editor__editable,
        .ck-button:not(.ck-disabled):hover,
        a.ck.ck-button:not(.ck-disabled):hover,
        .ck-button {
            background: transparent!important;
        }
        .ck-button__label {
            color: ${({ theme }) => theme.colors.fg.default}!important;
        }
        .ck-dropdown__panel,
        .ck.ck-list,
        .ck-balloon-rotator__content,
        .ck .ck-link-form .ck-responsive-form  {
            background: ${({ theme }) => theme.colors.bg.muted};
        }
    }
`

export default React.memo(CKEditorWrapper)
