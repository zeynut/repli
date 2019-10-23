import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Repli = ({Component}) => {
    return (
        <>
        <Head>
        <title>Repli</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
        </Head>
        <AppLayout>
            <Component/>
        </AppLayout>
        </>
    );
}
Repli.propTypes = {
    Component: PropTypes.elementType,
}

export default Repli;
