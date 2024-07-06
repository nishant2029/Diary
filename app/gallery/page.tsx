"use client"
// import { useState, useEffect, ChangeEvent } from 'react';
// import axios from 'axios';

// interface Image {
//   _id: string;
//   url: string;
//   createdAt: string;
// }

// const Gallery = () => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     async function fetchImages() {
//       try {
//         const res = await axios.get('/api/images');
//         setImages(res.data);
//       } catch (err) {
//         console.error('Failed to fetch images:', err);
//         setError('Failed to fetch images');
//       }
//     }
//     fetchImages();
//   }, []);

//   const handleAddImage = async () => {
//     if (!file) {
//       setError('Please select an image file');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await axios.post('/api/images', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setImages([...images, res.data]);
//       setFile(null);
//       setError('');
//     } catch (error) {
//       console.error('Failed to add image:', error);
//       setError('Failed to add image');
//     }
//   };

//   return (
//     <div className="gallery_container">
//       <h1 className="stylish-heading">Gallery</h1>
//       <div className="gallery">
//         {images.map((image) => (
//           <div key={image._id} className="image-item">
//             <img src={image.url} alt="Uploaded" className="image" />
//           </div>
//         ))}
//       </div>
//       <div className="upload-section">
//         <input
//           type="file"
//           className="file-input"
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
//         />
//         <button className="add-image-button" onClick={handleAddImage}>Add Image</button>
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Gallery;


import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'; // Import default styles

interface Image {
  _id: string;
  url: string;
  createdAt: string;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [fullscreen, setFullscreen] = useState(false); // State for full-screen mode
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State for current image index

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get('/api/images');
        setImages(res.data);
      } catch (err) {
        console.error('Failed to fetch images:', err);
        setError('Failed to fetch images');
      }
    }
    fetchImages();
  }, []);

  const handleAddImage = async () => {
    if (!file) {
      setError('Please select an image file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages([...images, res.data]);
      setFile(null);
      setError('');
    } catch (error) {
      console.error('Failed to add image:', error);
      setError('Failed to add image');
    }
  };

  const toggleFullscreen = (index: number) => {
    setCurrentIndex(index);
    setFullscreen(!fullscreen);
  };

  const handleCloseFullscreen = () => {
    setFullscreen(false);
  };

  const handleSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gallery_container">
      <h1 className="stylish-heading">Gallery</h1>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={image._id} className="image-item" onClick={() => toggleFullscreen(index)}>
            <img src={image.url} alt="Uploaded" className="image" />
          </div>
        ))}
      </div>
      <div className="upload-section">
        <input
          type="file"
          className="file-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
        />
        <button className="add-image-button" onClick={handleAddImage}>Add Image</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      {fullscreen && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <div className="fullscreen-image">
            <ImageGallery
              items={images.map(image => ({
                original: image.url,
                thumbnail: image.url, // You can use thumbnails if needed
                // description: image.createdAt // Example description
              }))}
              startIndex={currentIndex}
              showPlayButton={false}
              showFullscreenButton={false}
              autoPlay={false}
              slideInterval={2000}
              onSlide={(index: number) => handleSlide(index)}
              disableSwipe={false} // Enable swipe navigation
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

