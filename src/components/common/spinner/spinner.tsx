import { Spin } from 'antd'
import React from 'react'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <Spin size="large" />
        </div>
    )
}

export default Spinner