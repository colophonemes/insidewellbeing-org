import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/styles'
import ContentfulFigure from 'components/ContentfulFigure'

// const useStyles = makeStyles(theme => ({
//   root: {
//   }
// }))

const PictureGroup = ({ fields, sys }) => {
  // const classes = useStyles()
  const { pictures } = fields
  return <Grid container justify='center' spacing={2}>
    {pictures.map(picture => <Grid key={picture.sys.id} item sm={6}>
      <ContentfulFigure image={picture} />
    </Grid>)}
  </Grid>
}

PictureGroup.propTypes = {
  fields: PropTypes.shape({
    pictures: PropTypes.array.isRequired,
    body: PropTypes.object
  }).isRequired,
  sys: PropTypes.object.isRequired
}

export default PictureGroup
