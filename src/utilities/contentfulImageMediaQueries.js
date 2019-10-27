import { setup as reactContentfulImageSetup } from 'react-contentful-image'

const screenXs = '360px'
const screenSm = '600px'
const screenMd = '960px'
const screenLg = '1280px'
const screenXl = '1920px'

const media = {
  xs: `(min-width: ${screenXs})`,
  sm: `(min-width: ${screenSm})`,
  md: `(min-width: ${screenMd})`,
  lg: `(min-width: ${screenLg})`,
  xl: `(min-width: ${screenXl})`,
  dpr2: '(min-resolution: 144dpi)', // 1.5x devices and up get 2x images
  dpr3: '(min-resolution: 240dpi)', // 2.5x devices and up get 3x images
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
}

// Object keys are media query names from above. 'default' means no media query (default match).
// E.g. for mobile first 'default' would be the mobile media query
const variants = {
  default: {
    quality: 85,
    density: 1
  },
  dpr2: {
    quality: 35,
    density: 2
  },
  dpr3: {
    quality: 25,
    density: 3
  }
}

export const imageSizes = [
  {
    mediaQuery: 'default',
    params: { w: 228 }
  },
  {
    mediaQuery: 'sm',
    params: { w: 600 }
  },
  {
    mediaQuery: 'md',
    params: { w: 970 }
  },
  {
    mediaQuery: 'xl',
    params: { w: 1200 }
  }
]

const setup = () => reactContentfulImageSetup(media, variants)
export default setup
