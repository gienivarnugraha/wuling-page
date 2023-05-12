import { theme } from '@unocss/preset-mini'

const screens = {}

Object.entries(theme.breakpoints).map((breakpoint) => {
    return screens[breakpoint[0]] = parseInt(breakpoint[1].match(/\d+/)[0]);
})

const breakpoints = reactive({ w: 0, h: 0, is: 'xs' })

const xs = (val) => val < screens.sm
const sm = (val) => val >= screens.sm && val < screens.md
const smUp = (val) => val >= screens.sm
const md = (val) => val >= screens.md && val < screens.lg
const mdUp = (val) => val >= screens.md
const lg = (val) => val >= screens.lg && val < screens.xl
const xl = (val) => val >= screens.xl

const getBreakpoint = (w) => {
    if (xs(w)) return 'xs'
    else if (sm(w)) return 'sm'
    else if (smUp(w)) return 'smUp'
    else if (md(w)) return 'md'
    else if (mdUp(w)) return 'mdUp'
    else if (lg(w)) return 'lg'
    else if (xl(w)) return 'xl'
}

const setBreakpoint = () => {
    breakpoints.w = window.innerWidth
    breakpoints.h = window.innerHeight
    breakpoints.is = getBreakpoint(window.innerWidth)
}

const useBreakpoint = () => {
    setBreakpoint()
    window.addEventListener('resize', () => {
        setBreakpoint()
    })

    return breakpoints
}

export default useBreakpoint
