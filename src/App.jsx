import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { wrapHistory } from 'oaf-react-router'
import { ContentfulClient, ContentfulProvider } from 'react-contentful'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import teal from '@material-ui/core/colors/teal'
import blue from '@material-ui/core/colors/blue'
import setupMediaQueries from 'utilities/contentfulImageMediaQueries'

import Content from 'components/layout/Content'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((coll, h) => {
  coll[h] = {
    fontFamily: ['Zilla Slab', 'sans-serif'].join(', '),
    fontWeight: 700
  }
  return coll
}, {})

const bodyFontFamily = ['Libre Caslon Text', 'serif'].join(', ')

const theme = createMuiTheme({
  typography: {
    fontFamily: bodyFontFamily,
    body2: {
      fontFamily: bodyFontFamily
    },
    ...headings
  },
  palette: {
    primary: teal,
    secondary: blue,
    background: {
      default: '#ffffff'
    }
  },
  status: {
    danger: 'orange'
  },
  classes: {
    responsiveImage: {
      width: 'auto',
      maxWidth: '100%'
    }
  }
})

setupMediaQueries()

const history = createBrowserHistory()
wrapHistory(history)

const {
  REACT_APP_CONTENTFUL_SPACE,
  REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
} = process.env

const contentfulClient = new ContentfulClient({
  space: REACT_APP_CONTENTFUL_SPACE,
  accessToken: REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
})

const LOCALE = 'en-GB'

const App = () => <div className='App'>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <IntlProvider locale={LOCALE}>
      <ContentfulProvider client={contentfulClient} locale={LOCALE}>
        <Router history={history}>
          <Content />
        </Router>
      </ContentfulProvider>
    </IntlProvider>
  </ThemeProvider>
</div>

export default App
