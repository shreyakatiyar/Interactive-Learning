import React from 'react';

const MultimediaContentSection = () => {
  // Example multimedia content data
  const multimediaContent = [
    { id: 1, title: 'Webinar: Introduction to JavaScript', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'CSS Animation Basics', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    // Add more multimedia content as needed
  ];

  return (
    <section className="multimedia-content">
      <div className="container">
        <h2>Multimedia Content</h2>
        <div className="content-list">
          {multimediaContent.map(content => (
            <div key={content.id} className="content-item">
              <h3>{content.title}</h3>
              {content.type === 'video' ? (
                <iframe width="560" height="315" src={content.url} title={content.title} frameBorder="0" allowFullScreen></iframe>
              ) : (
                <img src={content.url} alt={content.title} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultimediaContentSection;
