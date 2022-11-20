import React from 'react'
import styled from 'styled-components/macro'

const ChartWrapper = styled.div`
    .highcharts-button-disabled {
        display: none;
    }
    .highcharts-input-group {
        transform: translate(80% ,10px)!important;
    }
    .highcharts-range-selector-buttons .highcharts-label text {
        display: none;
    }
    .highcharts-credits {
        fill: none!important;
    }
    .highcharts-background {
        fill: ${({ theme }) => theme.colors.bg.default};
    }
    .highcharts-yaxis-grid > path {
        stroke: ${({ theme }) => theme.colors.bg.muted};
    }
    .highcharts-yaxis-labels text {
        color: ${({ theme }) => theme.colors.fg.default}!important;
        fill: ${({ theme }) => theme.colors.fg.default}!important;
    }
    .highcharts-range-input text {
        color: ${({ theme }) => theme.colors.bg.action2}!important;
        fill: ${({ theme }) => theme.colors.bg.action2}!important;
    }
    .highcharts-graph {
        stroke: ${({ theme }) => theme.colors.bg.action};
    }
    .highcharts-point-down {
        fill: ${({ theme }) => theme.colors.bg.action};
        stroke: ${({ theme }) => theme.colors.bg.action};
    }
    .highcharts-point-up {
        fill: ${({ theme }) => theme.colors.bg.action2};
        stroke: ${({ theme }) => theme.colors.bg.action2};
    }
    .highcharts-navigator-outline {
        stroke: ${({ theme }) => theme.colors.bg.muted};
    }
    .highcharts-range-selector-buttons {
        display: block;
        background: ${({ theme }) => theme.colors.bg.muted};
        border-radius: 4px;
        padding: 4px 8px;
    }
    .highcharts-button-normal {
        text {
            color: ${({ theme }) => theme.colors.fg.default}!important;
            fill: ${({ theme }) => theme.colors.fg.default}!important;
        }
    }
    .highcharts-button-pressed {
        text {
            color: ${({ theme }) => theme.colors.bg.default}!important;
            fill: ${({ theme }) => theme.colors.bg.default}!important;
        }
    }
    .highcharts-button-box {
        fill: ${({ theme }) => theme.colors.bg.muted}!important;
    }
    .highcharts-button-hover {
        .highcharts-button-box {
            transition: all 0.3s ease 0s;
            fill: ${({ theme }) => theme.colors.bg.muted}!important;
            :hover {
                filter: brightness(85%);
            }
        }
    }
    .highcharts-button-pressed .highcharts-button-box {
        fill: ${({ theme }) => theme.colors.bg.action}!important;
    }
    .highcharts-button-disabled {
        text {
            color: #eee!important;
            fill: #eee!important;
        }
        .highcharts-button-box {
            fill: ${({ theme }) => theme.colors.bg.muted};
        }
    }
    .highcharts-xaxis-labels text {
        color: ${({ theme }) => theme.colors.fg.default};
        fill: ${({ theme }) => theme.colors.fg.default};
    }
    .highcharts-separator span {
        width: 100%!important;
        background: ${({ theme }) => theme.colors.fg.default};
        height: 1px!important;
        margin-top: 7px!important;
        background-image: none!important;
    }
    .highcharts-bindings-wrapper .highcharts-stocktools-toolbar li {
        background-color: ${({ theme }) => theme.colors.bg.action2};
        .highcharts-menu-item-btn {
            transition: all 0.3s ease 0s;
            border-radius: 4px;
            :hover {
                background-color: ${({ theme }) => theme.colors.bg.action2};
                filter: brightness(80%);
            }
        }
        border-radius: 4px;
    }
    .highcharts-bindings-wrapper li.highcharts-separator {
        background-color: transparent!important;
    }
    .highcharts-arrow-right {
        background-color: transparent!important;
    }
    .highcharts-bindings-wrapper .highcharts-submenu-wrapper {
        background-color: ${({ theme }) => theme.colors.bg.default};
    }
    .highcharts-active .highcharts-menu-item-btn {
        background-color: ${({ theme }) => theme.colors.bg.action}!important;
        border-radius: 4px;
    }
    .highcharts-series-type-heikinashi {
        display: none;
    }
    .highcharts-series-type-hollowcandlestick {
        display: none;
    }
    .highcharts-series-type-hlc {
        display: none;
    }
    .highcharts-indicators > span:first-child {
        background-image: url('/images/menu/indicators.svg')!important;
    }
    .highcharts-label-annotation > span:first-child {
        background-image: url('/images/menu/simple-shapes/label.svg')!important;
    }
    .highcharts-circle-annotation > span:first-child {
        background-image: url('/images/menu/simple-shapes/circle.svg')!important;
    }
    .highcharts-ellipse-annotation > span:first-child {
        background-image: url('/images/menu/simple-shapes/ellipse.svg')!important;
    }
    .highcharts-rectangle-annotation > span:first-child {
        background-image: url('/images/menu/simple-shapes/rectangle.svg')!important;
    }
    .highcharts-segment > span:first-child {
        background-image: url('/images/menu/lines/segment.svg')!important;
    }
    .highcharts-arrow-segment > span:first-child {
        background-image: url('/images/menu/lines/arrow-segment.svg')!important;
    }
    .highcharts-ray > span:first-child {
        background-image: url('/images/menu/lines/ray.svg')!important;
    }
    .highcharts-arrow-ray > span:first-child {
        background-image: url('/images/menu/lines/arrow-ray.svg')!important;
    }
    .highcharts-infinity-line > span:first-child {
        background-image: url('/images/menu/lines/line.svg')!important;
    }
    .highcharts-arrow-infinity-line > span:first-child {
        background-image: url('/images/menu/lines/arrow-line.svg')!important;
    }
    .highcharts-horizontal-line > span:first-child {
        background-image: url('/images/menu/lines/horizontal-line.svg')!important;
    }
    .highcharts-vertical-line > span:first-child {
        background-image: url('/images/menu/lines/vertical-line.svg')!important;
    }
    .highcharts-elliott3 > span:first-child {
        background-image: url('/images/menu/crooked-lines/elliott-3.svg')!important;
    }
    .highcharts-elliott5 > span:first-child {
        background-image: url('/images/menu/crooked-lines/elliott-5.svg')!important;
    }
    .highcharts-crooked3 > span:first-child {
        background-image: url('/images/menu/crooked-lines/crooked-3.svg')!important;
    }
    .highcharts-crooked5 > span:first-child {
        background-image: url('/images/menu/crooked-lines/crooked-5.svg')!important;
    }
    .highcharts-measure-xy > span:first-child {
        background-image: url('/images/menu/measure/measure-xy.svg')!important;
    }
    .highcharts-measure-x > span:first-child {
        background-image: url('/images/menu/measure/measure-x.svg')!important;
    }
    .highcharts-measure-y > span:first-child {
        background-image: url('/images/menu/measure/measure-y.svg')!important;
    }
    .highcharts-fibonacci > span:first-child {
        background-image: url('/images/menu/advanced/fibonacci.svg')!important;
    }
    .highcharts-fibonacci-time-zones > span:first-child {
        background-image: url('/images/menu/advanced/fibonacci-timezone.svg')!important;
    }
    .highcharts-pitchfork > span:first-child {
        background-image: url('/images/menu/advanced/pitchfork.svg')!important;
    }
    .highcharts-parallel-channel > span:first-child {
        background-image: url('/images/menu/advanced/parallel-channel.svg')!important;
    }
    .highcharts-time-cycles > span:first-child {
        background-image: url('/images/menu/advanced/time-cycles.svg')!important;
    }
    .highcharts-toggle-annotations > span:first-child {
        background-image: url('/images/menu/annotations-visible.svg')!important;
    }
    .highcharts-full-screen > span:first-child {
        background-image: url('/images/menu/fullscreen.svg')!important;
    }
    .highcharts-current-price-indicator > span:first-child {
        background-image: url('/images/menu/current-price-show.svg')!important;
    }
    .highcharts-save-chart > span:first-child {
        background-image: url('/images/menu/save-chart.svg')!important;
    }
    .highcharts-vertical-counter > span:first-child {
        background-image: url('/images/menu/vertical-labels/vertical-counter.svg')!important;
    }
    .highcharts-vertical-label > span:first-child {
        background-image: url('/images/menu/vertical-labels/vertical-label.svg')!important;
    }
    .highcharts-vertical-arrow > span:first-child {
        background-image: url('/images/menu/vertical-labels/vertical-arrow.svg')!important;
    }
    .highcharts-flag-circlepin > span:first-child {
        background-image: url('/images/menu/flags/flag-elipse.svg')!important;
    }
    .highcharts-flag-diamondpin > span:first-child {
        background-image: url('/images/menu/flags/flag-diamond.svg')!important;
    }
    .highcharts-flag-squarepin > span:first-child {
        background-image: url('/images/menu/flags/flag-trapeze.svg')!important;
    }
    .highcharts-flag-simplepin > span:first-child {
        background-image: url('/images/menu/flags/flag-basic.svg')!important;
    }
    .highcharts-zoom-x > span:first-child {
        background-image: url('/images/menu/zoom-change/zoom-x.svg')!important;
    }
    .highcharts-zoom-y > span:first-child {
        background-image: url('/images/menu/zoom-change/zoom-y.svg')!important;
    }
    .highcharts-zoom-xy > span:first-child {
        background-image: url('/images/menu/zoom-change/zoom-xy.svg')!important;
    }
    .highcharts-series-type-ohlc > span:first-child {
        background-image: url('/images/menu/type-change/series-ohlc.svg')!important;
    }
    .highcharts-series-type-line > span:first-child {
        background-image: url('/images/menu/type-change/series-line.svg')!important;
    }
    .highcharts-series-type-candlestick > span:first-child {
        background-image: url('/images/menu/type-change/series-candlestick.svg')!important;
    }
    .highcharts-arrow-right {
        background-image: url('/images/menu/arrow-bottom.svg')!important;
    }
    .highcharts-menu-wrapper {
        padding: 12px!important;
        border-right: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    }
    .highcharts-popup {
        background-color: ${({ theme }) => theme.colors.bg.muted};
        color: ${({ theme }) => theme.colors.fg.default};
        input {
            border-color: ${({ theme }) => theme.colors.border.default};
            background-color: ${({ theme }) => theme.colors.bg.default};
            height: 40px;
            color: ${({ theme }) => theme.colors.fg.default};
        }
        .highcharts-popup-close {
            :hover {
                filter: brightness(85%);
                background-color: transparent;
            }
        }
        .highcharts-popup-main-title {
            padding: 8px 0px 14px 20px;
        }
    }
    .highcharts-input-search-indicators-label {
        color: ${({ theme }) => theme.colors.fg.default};
    }
    button, .clear-filter-button, .highcharts-tab-item {
        border-radius: 4px;
        padding: 4px 8px;
        background-color: ${({ theme }) => theme.colors.bg.default}!important;
        color: ${({ theme }) => theme.colors.fg.default}!important;
    }
    .highcharts-indicator-list {
        color: ${({ theme }) => theme.colors.fg.default};
        :hover {
            background-color: transparent;
            filter: brightness(85%);
        }
    }
`


export default React.memo(ChartWrapper)
