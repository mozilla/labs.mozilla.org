import React from 'react'

export default ({title, url, rel, blank}) => <a
    target={blank && '_blank'}
    rel={rel && 'noopener'}
    data-type="link"
    href={url}
>{title}</a>
