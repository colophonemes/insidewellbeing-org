import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PostExcerpt from 'components/PostExcerpt'
import { ContentfulContentQuery } from 'utilities/contentful'
import { ButtonLink } from 'components/Link'

const PostsGrid = ({ items, grid, morePosts }) => <Grid container spacing={3}>
  {items.map(({ sys, fields }) => <Grid item xs={12} sm={grid ? 6 : 12} key={sys.id}>
    <PostExcerpt {...fields} />
  </Grid>)}
  {morePosts && <Grid item xs={12}>
    <Grid container justify='center'>
      <Grid item xs={12} sm={6}>
        <ButtonLink fullWidth variant='outlined' color='primary' to='/blog'>More Posts</ButtonLink>
      </Grid>
    </Grid>
  </Grid>}
</Grid>

PostsGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired
    })
  ),
  grid: PropTypes.bool,
  morePosts: PropTypes.bool
}

const PostsGridWrapper = ({ limit, grid, morePosts }) =>
  <ContentfulContentQuery
    contentType='post'
    query={{
      order: '-sys.createdAt',
      limit
    }}
    component={props => <PostsGrid {...props} grid={grid} morePosts={morePosts} />}
  />

PostsGridWrapper.propTypes = {
  limit: PropTypes.number,
  grid: PropTypes.bool,
  morePosts: PropTypes.bool
}

export default PostsGridWrapper
