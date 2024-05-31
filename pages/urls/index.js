import React, { useState, useEffect } from 'react';

const UrlManager = () => {
  const [urls, setUrls] = useState([]);
  const [name, setName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch("https://api-url.phoneonetwo.com/url");
      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the URLs');
    }
  };

  const addUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api-url.phoneonetwo.com/addurl", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, urls: newUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to add URL');
      }
      const result = await response.json();
      if (result.status === 'ok') {
        setName('');
        setNewUrl('');
        fetchUrls();
      } else {
        throw new Error('Failed to add URL');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the URL');
    }
  };

  const deleteUrl = async (id) => {
    try {
      const response = await fetch(`https://api-url.phoneonetwo.com/durl/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete URL');
      }
      fetchUrls();
    } catch (error) {
      console.error(error);
      setError('An error occurred while deleting the URL');
    }
  };

  return (
    <div className="url">
        <h3>Add URL</h3>
      {error && <p>{error}</p>}
      <form onSubmit={addUrl}>
        <input
          type="hidden"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          
        />
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter new URL"
          required
        />
        <button type="submit">Add URL</button>
      </form>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            <br/>
            <span> URL: {url.urls}</span>
            <button onClick={() => deleteUrl(url.id)}>ลบ</button>
          </li>
        ) )
        }
      </ul>
    </div>
  );
};
export default UrlManager;
