import React from 'react'

interface IDevices {
    mobile: boolean
    tablet: boolean
    desktop: boolean
}

const queries = [
    '(max-width: 767.97px)',
    '(min-width: 768px) and (max-width: 1279.97px)',
    '(min-width: 1280px)',
]

export const useMatchMedia = (): IDevices => {
    const mediaQueryLists = queries.map((query) => matchMedia(query))

    const getValues = () => mediaQueryLists.map((list) => list.matches)

    const [values, setValues] = React.useState(getValues)

    React.useLayoutEffect(() => {
        const handler = () => setValues(getValues)

        mediaQueryLists.forEach((list) => list.addEventListener('change', handler))

        return () =>
            mediaQueryLists.forEach((list) =>
                list.removeEventListener('change', handler),
            )
    })

    return ['mobile', 'tablet', 'desktop'].reduce((acc, screen, index) => ({
        ...acc,
        [screen]: values[index],
    }), {} as IDevices)
}
