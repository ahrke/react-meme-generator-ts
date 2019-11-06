
import React, { useState, useEffect, DOMElement } from 'react';
import { render } from 'react-dom';
import domtoimage from 'dom-to-image-more';

import Content from './components/content';
import Form from './components/form';
import Result from './components/result';

import './styles/styles.css';

const App = () => {
  let contentContainerRef = React.useRef<HTMLElement | null>(null);
  let resultContainerRef = React.useRef<HTMLElement | null>(null)

  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [isMemeGenerated, setIsMemeGenerated] = useState(false);

  // fetch images
  const fetchImage = async () => {
    const imgData = await fetch('https://api.imgFlip.com/get_memes')
      .then(res => res.json())
      .catch(err => console.error(err))
    const { memes } = await imgData.data;
    await setImages(memes)

    await setActiveImage(memes[0].url)
  }

  const handleInputChange = (event) => {
    if (event.target.name === 'text-top') {
      setTextTop(event.target.value)
    } else {
      setTextBottom(event.target.value)
    }
  }

  const handleImageChange = () => {
    const image = images[Math.floor(Math.random() * images.length)]

    setActiveImage(image.url)
  }

  const handleImageInputChange = event => {
    setActiveImage(window.URL.createObjectURL(event.target.files[0]))
  }

  const handleMemeGeneration = () => {
    if (resultContainerRef.current.childNodes.length > 0) {
      resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])
    }

    domtoimage.toPng(contentContainerRef.current)
      .then(dataUrl => {
        const img = new Image();

        img.src = dataUrl;

        resultContainerRef.current.appendChild(img);

        setIsMemeGenerated(true);
      })
  }

  const handleMemeReset = () => {
    resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0]);

    setIsMemeGenerated(false);
  }

  useEffect(() => {
    fetchImage()
  }, []);

  return (
    <div>
      <Form
        textTop={textTop}
        textBottom={textBottom}
        handleImageInputChange={handleImageInputChange}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleMemeGeneration={handleMemeGeneration}
        handleMemeReset={handleMemeReset}
        isMemeGenerated={isMemeGenerated}
      />

      <Content
        activeImage={activeImage}
        contentContainerRef={contentContainerRef}
        textBottom={textBottom}
        textTop={textTop}
      />

      <Result resultContainerRef={resultContainerRef} />
    </div>
  )
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
