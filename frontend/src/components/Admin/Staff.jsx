import React, { useState, useEffect } from "react";
import axios from "axios";
import 'antd/dist/antd.css'

const Staff = () => {

    const [staffList, setStaffList] = useState(null);

    useEffect(() => {
        const loadStaff = async () => {
            const response = await axios.get('http://localhost:4000/LibSystem/find-staff');
            setStaffList(response.data.data)
            console.log('Response: ', response.data.data)
        }
        loadStaff();
    }, [])

    return (
        <div>
            Staff page
        </div>
    )
}

export default Staff