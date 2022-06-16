import React, { useEffect, useState } from 'react';
import { getRequest } from '../library/middleware';

export default function Page({ item }) {
    return (
        <div>
            <h2>{item.title}</h2>
            <img src={item.image_url} />
            {item.price_display}
            <div>{item.description}</div>
            <div>
                Link: <a src={item.web_url}></a>
            </div>
        </div>
    );
}
