import Mustache from 'mustache'

export const mustache = (template: string, view: any): string => Mustache.render(template, view)
