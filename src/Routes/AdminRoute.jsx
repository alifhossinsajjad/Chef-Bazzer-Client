import React from 'react';
import useAuth from '../Hooks/useAuth';

const AdminRoute = ({children}) => {
    const {loading} = useAuth()
    
    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;