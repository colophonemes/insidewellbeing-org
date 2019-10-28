import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Link from 'components/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { ContentfulRenderer } from 'utilities/contentful'
import { makeStyles } from '@material-ui/styles'
import FormattedDate from 'components/FormattedDate'
import Meta from 'components/layout/Meta'

const Byline = ({ authors }) => <span>
  by{' '}
  {authors.map(({ fields, sys }, index) => <span key={sys.id}>
    {fields.slug === 'daria-belostotckaia'
      ? <Link to={'/about'}>{fields.name}</Link>
      : fields.name
    }
    {index < authors.length - 1 && `${index === authors.length - 2 ? ' &' : ','} `}
  </span>)}
</span>

Byline.propTypes = {
  authors: PropTypes.array.isRequired
}

const postContentStyles = makeStyles(theme => ({
  frontMatter: {
    fontStyle: 'italic',
    marginBottom: theme.spacing(6)
  }
}))

const formattedTitleStyles = makeStyles(theme => ({
  subtitle: {
    color: theme.palette.primary.dark
  }
}))

const FormattedTitle = ({ title }) => {
  const parts = title.match(/(.*?):([^:]*?$)/)
  if (!parts) return title
  const [mainTitle, subTitle] = parts.map(p => p.trim()).slice(1)
  const classes = formattedTitleStyles()
  return <span>
    {mainTitle}
    {subTitle && <React.Fragment>
      <br />
      <small className={classes.subtitle}>{subTitle}</small>
    </React.Fragment>}
  </span>
}

FormattedTitle.propTypes = {
  title: PropTypes.string.isRequired
}

const PostContent = ({ fields: { title, body, slug, authors }, sys }) => {
  const classes = postContentStyles()
  return <article>
    <Box component='section'>
      <Typography variant='h2' gutterBottom>
        <Link color='inherit' component={RouterLink} to={`/blog/${slug}`}>
          <FormattedTitle title={title} />
        </Link>
      </Typography>
    </Box>
    <Box component='section' className={classes.frontMatter}>
      <Typography paragraph>
        Posted <FormattedDate value={new Date(sys.createdAt)} />
        {authors && <span>,{' '}<Byline authors={authors} /></span>}
      </Typography>
    </Box>
    <Box component='section'>
      <ContentfulRenderer document={body} />
    </Box>
  </article>
}

PostContent.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    authors: PropTypes.array
  }).isRequired,
  sys: PropTypes.object.isRequired
}

export default PostContent
