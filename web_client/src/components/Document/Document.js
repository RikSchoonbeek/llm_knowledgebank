import React from 'react'
import PropTypes from 'prop-types'

const Document = ({ document }) => {
  return (
    <div>
      <h2>{document.name}</h2>
      <p>{document.description}</p>
      <a href={document.content}>Download Document</a>
      <p>
        {document.tags.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </p>
    </div>
  )
}

Document.propTypes = {
  document: PropTypes.object.isRequired,
}

export default Document
