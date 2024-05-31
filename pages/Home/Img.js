// Img.js
import React from 'react';

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.phoneonetwo.com/api/get');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } }; // Return empty array on error
  }
}

export default function Img({ data }) {
  return (
    <div className="images">
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <img src={`https://api.phoneonetwo.com/${item.url}`} alt={item.filename} style={{ width: '100%', height: '100%', padding: '10px' }} />
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}
