import { type JSX, useEffect, useState } from 'react';

function BackToTop(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="backToTop">
      <h1>Back To Top</h1>

      {Array.from({ length: 50 }).map((_, i) => (
        <p key={i}>This is dummy paragraph number {i + 1}</p>
      ))}

      <div className="container">
        {isVisible && (
          <button onClick={scrollToTop} className="backtotop-btn" data-testid="back-to-top-btn">
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
}
export default BackToTop;
