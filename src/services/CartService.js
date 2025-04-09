import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

// Hàm lấy giỏ hàng của người dùng
export const fetchCartOfUser = async () => {
    try {
        const response = await axiosInstance.get('carts/getCartOfUser');
        return response.result; 
    } catch (error) {
        console.error('Error fetching user cart:', error);
        throw error;
    }
};

// Lấy các sản phẩm được chọn trong giỏ hàng
export const fetchCartCheckedOfUser = async () => {
    try {
        const response = await axiosInstance.get('carts/getCartCheckedOfUser');
        return response.result; 
    } catch (error) {
        console.error('Error fetching user cart checked:', error);
        throw error;
    }
};

// Hàm thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (cartRequest) => {
    try {
        const response = await axiosInstance.post('carts/addCart', cartRequest, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        console.error('Error add product to cart:', error);
        throw error;
    }
};

// Lấy số lượng sản phẩm trong giỏ hàng
export const getNumberOfCart = async () => {
    try {
        const response = await axiosInstance.get('carts/getNumberOfCart', {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        console.error('Error get number of cart:', error);
        throw error;
    }
};

// Hàm cập nhật trạng thái sản phẩm trong giỏ hàng
export const updateCheckInCart = async (IdCart) => {
    try {
        const response = await axiosInstance.put(`carts/updateCart/${IdCart}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityInCart = async (productId, quantity) => {
    try {
        const response = await axiosInstance.put(
            `carts/updateQuantityCart/${productId}`,
            { quantity },
            {
                headers: {
                    ...getHeader(),
                },
            },
        );
        return response.result;
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

// Hàm tăng số lượng sản phẩm trong giỏ hàng
export const increaseQuantityInCart = async (productId) => {
    try {
        const response = await axiosInstance.put(`carts/increaseQuantityCart/${productId}`, null, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        console.error('Error increase quantity of product in cart:', error);
        throw error;
    }
};

// Hàm giảm số lượng sản phẩm trong giỏ hàng
export const decreaseQuantityInCart = async (productId) => {
    try {
        const response = await axiosInstance.put(`carts/decreaseQuantityCart/${productId}`, null, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        console.error('Error decrease quantity of product in cart:', error);
        throw error;
    }
};

// Hàm xóa sản phẩm khỏi giỏ hàng
export const deleteProductFromCart = async (productId) => {
    try {
        const response = await axiosInstance.delete(`carts/deleteCart/${productId}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; 
    } catch (error) {
        if (error.response) {
            console.error('LError response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

// Thêm sản phẩm vào giỏ hàng
export const AddToCart = async (productId, quantity) => {
    try {
        const response = await axiosInstance.post(
            'carts/addCart',
            {
                id_product: productId,
                quantity: quantity,
            },
            {
                headers: {
                    ...getHeader(),
                },
            },
        );
        return response.result; 
    } catch (error) {
        if (error.response) {
            console.error('LError response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};
