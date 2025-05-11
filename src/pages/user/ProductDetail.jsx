import React from 'react';
import ProductMainDetail from '../../components/ProductDetail/ProductMainDetail'
import ReviewDisplay from '../../components/ProductDetail/ReviewDisplay';
import ReviewList from '../../components/ProductDetail/ReviewList';
import RelatedProductList from '../../components/ProductDetail/RelatedProductList';

function ProductDetail() {
    return (
        <div className="p-4 w-[1200px] mx-auto">
            <ProductMainDetail />
            <div className="mb-[4rem]">
                <ReviewList />
            </div>
            <ReviewDisplay />
            <RelatedProductList />
        </div>
    );
}

export default ProductDetail;
