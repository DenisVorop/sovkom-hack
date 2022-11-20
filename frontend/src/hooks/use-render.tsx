
import React from 'react'

import { mustache } from '../libs/utils/mustache'
import { sanitize } from '../libs/utils/sanitize'

export const useContentRenderer = () => {
    const handler = React.useCallback((template: string, view: any, render = true) => {
        try {
            const code = mustache(template, view)
            return render ? <div dangerouslySetInnerHTML={{ __html: sanitize(code) }} /> : code
        } catch (e) {
            return template
        }
    }, [])
    return {
        r: handler,
    }
}
