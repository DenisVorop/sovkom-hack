import dompurify from 'isomorphic-dompurify'

export const sanitize = (html: string | Node) => dompurify.sanitize(html)
