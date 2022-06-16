import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function Page({ item }) {
    console.log(item);

    return (
        <div className='page'>
            <h1 className='page-title'>{item.title}</h1>
            <div className='page-content'>
                <div className='page-image'>
                    <img alt={item.title} src={item.image_url} />
                </div>
                <div className='page-text'>
                    <div className='description'>{ReactHtmlParser(item.description)}</div>
                    <div className='price'>
                        <h2>Price:</h2>
                        {ReactHtmlParser(item.price_display)}
                    </div>
                    <div className='link'>
                        <a href={item.web_url} target='_blank' rel='noreferrer'>
                            Click here to visit website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
