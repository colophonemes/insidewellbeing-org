import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { SITE_TITLE, DEFAULT_OG_IMAGE } from 'site_config'

const getTitle = title => title ? `${title} - ${SITE_TITLE}` : SITE_TITLE

const getImageURL = image => {
  if (typeof image === 'object' && image.fields) return image.fields.file.url
  if (typeof image === 'string') return image
}

const getDescription = document => {
  const description = typeof document === 'object' ? documentToPlainTextString(document) : document
  const beginning = description.slice(0, 160)
  const parts = beginning.replace('\n', ' ').split(' ')
  return `${parts.slice(0, parts.length - 2).join(' ')} ...`
}

const Meta = ({ title, ogImage, description }) => <Helmet>
  <title>{getTitle(title)}</title>
  <meta property="og:title" content={getTitle(title)} />
  <meta property="og:image" content={getImageURL(ogImage) || DEFAULT_OG_IMAGE} />
  <meta property="og:type" content='blog' />
  {description && <meta name="description" content={getDescription(description)} />}
  {description && <meta property="og:description" content={getDescription(description)} />}
</Helmet>

Meta.propTypes = {
  title: PropTypes.string,
  ogImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      fields: PropTypes.object.isRequired
    })
  ]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default Meta
