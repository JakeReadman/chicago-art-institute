import { Pagination, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { getRequest } from '../library/middleware';
import Page from './Page';

export default function Catalogue() {
    const [item, setItem] = useState({});
    const [pagination, setPagination] = useState(1);

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
        getRequest({
            endpoint: 'api/v1/products',
            params: {
                limit: 1,
                page: page,
            },
            onSuccess: (response) => {
                setItem(response.data.data[0]);
                setPagination(response.data.pagination);
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

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
                    />
                </div>
                {item?.title && <Page item={item} />}
            </Space>
        </div>
    );
}
