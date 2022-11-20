const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tabletS: '640px',
    tabletM: '768px',
    laptopS: '1024px',
    laptopM: '1280px',
    laptopL: '1440px',
    desktop: '2560px',
}

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tabletS: `(min-width: ${size.tabletS})`,
    tabletM: `(min-width: ${size.tabletM})`,
    laptopS: `(min-width: ${size.laptopS})`,
    laptopM: `(min-width: ${size.laptopM})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,
}

export const toFixed = (_x: number) => {
    let x = _x || 0
    if (Math.abs(+x) < 1.0) {
        const e = parseInt(x.toString().split('e-')[1])
        if (e) {
            x *= Math.pow(10, e - 1)
            x = Number('0.' + new Array(e).join('0') + x.toString().substring(2))
        }
    } else {
        let e = parseInt(x.toString().split('+')[1])
        if (e > 20) {
            e -= 20
            x /= Math.pow(10, e)
            x += Number(new Array(e + 1).join('0'))
        }
    }
    return x
}

export const formatCurrencyAmountV2 = (num: number, count = 11) => {
    return String(num).includes('e')
        ? toFixed(num).toString().slice(0, count)
        : Number(num)
            .toLocaleString('ru-RU', { useGrouping: true })
            .replace(',', '.')
}

export const rounding_format = (
    number: number | string,
    decimals = 2,
    dec_point = '.',
    thousands_sep = ',',
    type = 'string',
) => {
    let num = number
    const idx = num?.toString().split('').indexOf(',')

    if (typeof number === 'string') {
        num = number.replace(/\s+/g, '')
    }

    if (idx !== -1) {
        const tmp = num?.toString().split('')
        tmp?.splice(idx, 1, '.')
        num = tmp?.join('')
    }

    if (num < 0 || !num) {
        num = '0'
    }

    if (num.toString().split('').includes('e')) {
        num = formatCurrencyAmountV2(+num)
    }

    if (num >= '1' || num >= 1) {
        const sign = num < 0 ? '-' : ''
        const s_num =
            Math.abs(parseInt((num = (+num || 0).toFixed(decimals)))) + ''
        const len = s_num.length
        const tchunk = len > 3 ? len % 3 : 0
        const ch_first = tchunk ? s_num.substring(0, tchunk) + thousands_sep : ''
        const ch_rest = s_num
            .substring(tchunk)
            .replace(/(\d\d\d)(?=\d)/g, '$1' + thousands_sep)
        let ch_last = decimals
            ? dec_point + (Math.abs(+num) - +s_num).toFixed(decimals).slice(2)
            : ''

        if (ch_last === '.00') {
            ch_last = ''
        }

        return String(sign + ch_first + ch_rest + ch_last)
    }

    if (num < '1' || num < 1) {
        const res = [] as string[]
        const splitedNum = num.toString().split('')
        let idx = splitedNum.indexOf('.')
        let counter = 0

        if (idx < 0) {
            return num
        }

        splitedNum.splice(idx, 1)
        res.push(splitedNum[0])
        for (idx + 1; idx < splitedNum.length; idx++) {
            if (counter < decimals) {
                res.push(splitedNum[idx])
                if (!(splitedNum[idx] === '0' && splitedNum[idx - 1] === '0')) {
                    counter++
                }
            }
        }
        res.splice(1, 0, '.')

        return type === 'string' ? String(res.join('')) : Number(res.join(''))
    }

    return +num
}
