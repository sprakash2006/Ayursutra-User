import React from 'react';
import styled from 'styled-components';
import LoaderBG from '../assets/images/ayurveda-hero-bg.jpg';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="typewriter text-[2rem] mb-[2vw] ml-[4vw]" style={{ fontFamily: '"Amita", serif', fontWeight: 400, fontStyle: 'normal' }}>
        शुद्धे शुद्धकृतात्मानं तत्रात्मानं निवेशयेत्। <br />
        शुद्धे हि सति यत्किंचित् सिद्ध्यत्येव न संशयः॥
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url(${LoaderBG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;


  .typewriter {
    color:white;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-shadow: 2px 2px 6px rgba(0,0,0,1);

    /* Animation */
    animation: typing 8s steps(60, end), blink-caret 0.7s step-end infinite;
  }
`;

export default Loader;
