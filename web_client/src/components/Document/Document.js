import React from 'react';

const Document = ({ document }) => {
    return (
        <div>
            <h2>{document.name}</h2>
            <p>{document.description}</p>
            <a href={document.content}>Download Document</a>
            <p>
                {document.tags.map(tag => (
                    <span key={tag.id}>{tag.name}</span>
                ))}
            </p>
        </div>
    );
}

export default Document;
