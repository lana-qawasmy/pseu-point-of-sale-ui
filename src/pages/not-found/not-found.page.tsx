import React from 'react'
import './not-found.css'
import { notFound } from '../../assets'

const NotFound = () => {
    console.log('not found page')
    return (
        <div className="notFound">
            <div className="notFoundImage" style={{ backgroundImage: `url(${notFound})` }}></div>
            <div style={{ fontSize: '30px' , fontWeight:'bold' , color: '#3362cc' }}>This page is not found!</div>
        </div>
    )
}

export default NotFound