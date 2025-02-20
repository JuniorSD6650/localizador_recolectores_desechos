import React from 'react';
import Cargando from './carga';

const withLoading = (WrappedComponent) => {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return <Cargando />;
        }
        return <WrappedComponent {...props} />;
    };
};

export default withLoading;