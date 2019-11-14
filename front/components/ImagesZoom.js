import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {Overlay , Header, Slickwrapper , ImgWrapper , Indicator ,CloseBtn } from './ImagesZoomStyle';



const ImagesZoom = ({images, onClose}) => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    
    return (
        <>
        <Overlay>
            <Header>
                <H1>상세이미지</H1>
                <CloseBtn type="close" onClick={onClose} />                     
            </Header>
            <Slickwrapper>
                <div>
                    <Slick
                    initialSlide={0}
                    afterChange={(slide) => setCurrentSlide(slide)}
                    infinite={false}
                    arrows
                    slidesToShow={1}
                    slidesToScroll={1}
                     >
                         {images.map((v) => {
                             return (
                                 <ImgWrapper>
                                     <img src={`http://localhost:3065/${v.src}`}
                                        style={{ margin: '0 auto', maxHeight: 750}} />
                                 </ImgWrapper>
                             )
                         })}
                    </Slick>
                    <Indicator>
                        <div>
                        {currentSlide + 1} / {images.length}
                        </div>
                    </Indicator>
                </div>
            </Slickwrapper>
        </Overlay>
        </>
    );
};

ImagesZoom.prototype = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src:PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;