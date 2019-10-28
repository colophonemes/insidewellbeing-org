import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import Link from 'components/Link'
import { rendererConfig } from 'utilities/contentful'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import { getBackgroundImageCss } from 'react-contentful-image'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  card: {
    position: 'relative'
  },
  content: {
    height: 180
  },
  featuredImage: {
    height: 240,
    backgroundColor: theme.palette.primary[200],
    width: '100%',
    backgroundSize: 'cover'
  },
  readMoreLink: {
    zIndex: 110,
    position: 'relative',
    marginBottom: theme.spacing(1)
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    width: '100%',
    zIndex: 100,
    background: 'linear-gradient(#FFF0, #FFF 75%)'
  }
})

const blogLink = slug => `/blog/${slug}`

const imageSizes = [
  {
    mediaQuery: 'xs',
    params: {
      w: 400,
      h: 240,
      fit: 'fill',
      q: 40
    }
  },
  {
    mediaQuery: 'sm',
    params: {
      w: 400,
      h: 240,
      fit: 'fill',
      q: 70
    }
  },
  {
    mediaQuery: 'lg',
    params: {
      w: 800,
      h: 280,
      fit: 'fill',
      q: 70
    }
  }
]

const PostExcerpt = ({ title, body, slug, excerpt, featuredImage, classes, history }) => {
  excerpt = excerpt || Object.assign({}, body, { content: body.content.slice(0, 1) })
  const clickThrough = () => history.push(blogLink(slug))
  const bgImageClasses = featuredImage ? getBackgroundImageCss(featuredImage.fields.file.url, imageSizes) : null
  return <article>
    <Card className={classes.card}>
      <CardActionArea onClick={clickThrough}>
        <Box className={[bgImageClasses, classes.featuredImage].join(' ')} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h4">
            {title}
          </Typography>
          {documentToReactComponents(excerpt, rendererConfig)}
        </CardContent>
        <Typography align='center' className={classes.readMoreLink}>
          <Link to={blogLink(slug)}>
            Read more ...
          </Link>
        </Typography>
        <div className={classes.gradientOverlay} />
      </CardActionArea>
    </Card>
  </article>
}

PostExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({
    content: PropTypes.array.isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.object,
  featuredImage: PropTypes.object,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(withStyles(styles)(PostExcerpt))
