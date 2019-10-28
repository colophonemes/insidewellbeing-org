import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  affiliateText: {
    color: theme.palette.grey[700],
    fontStyle: 'italic'
  }
})

const Footer = ({classes}) => <footer>
  <Grid container spacing={4} justify='center'>
    <Grid item xs={12}><Typography align='center'>All content (c) Daria Belostotckaia 2019</Typography></Grid>
    <Grid item xs={12}><Typography align='center' className={classes.affiliateText}>
      <small>Some links are part of the Amazon Affiliate program and I may earn money from qualifying purchases.</small>
    </Typography></Grid>
  </Grid>
</footer>

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
