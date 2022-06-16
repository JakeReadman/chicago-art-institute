import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { getRequest } from '../library/middleware';
import Page from './Page';

export default function Catalogue() {
    const [item, setItem] = useState({});
    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        getRequest({
            endpoint: '/v1/products',
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
            endpoint: '/v1/products',
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
        <div>
            <Pagination current={pagination.current_page} total={pagination.total_pages} onChange={changePage} />
            {item?.title && <Page item={item} />}
        </div>
    );
}
