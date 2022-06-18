import { Pagination, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { getRequest } from '../library/middleware';
import Page from './Page';

export default function Catalogue() {
    const [item, setItem] = useState({});
    const [pagination, setPagination] = useState(1);
    const [image, setImage] = useState('');

    useEffect(() => {
        getRequest({
            endpoint: 'api/v1/products',
            params: {
                limit: 1,
            },
            onSuccess: (response) => {
                setItem(response.data.data[0]);
                setPagination(response.data.pagination);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }, []);

    const changePage = (page) => {
        setImage('');
        getRequest({
            endpoint: 'api/v1/products',
            params: {
                limit: 1,
                page: page,
            },
            onSuccess: (response) => {
                console.log(response);
                setItem(response.data.data[0]);
                setPagination(response.data.pagination);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    useEffect(() => {
        if (!item?.id) {
            return;
        }
        getRequest({
            endpoint: `api/v1/artworks/${item.id}`,
            params: {
                fields: 'id,title,image_id',
            },
            onSuccess: (response) => {
                setImage(`https://www.artic.edu/iiif/2/${response.data.data.image_id}/full/843,/0/default.jpg`);
            },
            onError: (error) => {
                console.warn(error);
                setImage(item.image_url);
            },
        });
    }, [item]);

    return (
        <div className='catalogue'>
            <Space direction='vertical' align='center' style={{ width: '90vw', height: '80vh' }}>
                <div className='pagination'>
                    <Pagination
                        defaultCurrent={pagination.current_page}
                        total={pagination.total_pages}
                        onChange={changePage}
                        showSizeChanger={false}
                        showQuickJumper
                        showTotal={(total) => `Total ${total} items`}
                        responsive={false}
                    />
                </div>
                {item?.title && <Page item={item} image={image} />}
            </Space>
        </div>
    );
}
