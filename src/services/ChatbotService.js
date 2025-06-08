import { fetchAllProduct } from './ProductService';
import { getAllVoucherUser } from './VoucherService';

// Cấu hình Gemini AI
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyB8j2s2C7x-tcH6HqY1ix5pIp3iF-vpyLc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Lấy thông tin sản phẩm để cung cấp context cho chatbot
export const getProductsContext = async () => {
    try {
        const response = await fetchAllProduct();
        return response.data;
    } catch (error) {
        console.error('Error fetching products for chatbot:', error);
        return [];
    }
};

// Lấy thông tin voucher để cung cấp context cho chatbot
export const getVouchersContext = async () => {
    try {
        const response = await getAllVoucherUser();
        return response || [];
    } catch (error) {
        console.error('Error fetching vouchers for chatbot:', error);
        return [];
    }
};

// Tạo system prompt để hướng dẫn chatbot
const createSystemPrompt = (products, vouchers) => {
    const productList = products.map(p => 
        `- ${p.name}: Giá gốc ${p.original_price?.toLocaleString()}đ, Giá bán ${p.sell_price?.toLocaleString()}đ` +
        (p.discount > 0 ? `, Giảm giá ${Math.round(p.discount * 100)}%` : '') +
        `, Số lượng còn lại: ${p.quantity}, Đã bán: ${p.sold_quantity}` +
        (p.review > 0 ? `, Đánh giá: ${p.review}/5 sao` : '')
    ).join('\n');

    const voucherList = vouchers && vouchers.length > 0 ? vouchers.map(v => {
        const today = new Date();
        const startDate = new Date(v.start_date);
        const endDate = new Date(v.end_date);
        const isValid = today >= startDate && today <= endDate && v.quantity > 0;
        
        return `- **${v.id_voucher}**: Giảm ${v.discount_price?.toLocaleString()}đ` +
        (v.min_total ? `, Đơn tối thiểu: ${v.min_total?.toLocaleString()}đ` : '') +
        `, Mã: ${v.id_voucher}` +
        `, Còn lại: ${v.quantity} lượt` +
        `, Bắt đầu: ${startDate.toLocaleDateString('vi-VN')}` +
        `, Hết hạn: ${endDate.toLocaleDateString('vi-VN')}` +
        (isValid ? ' ✅' : ' ❌ (Hết hạn hoặc hết lượt sử dụng)');
    }).join('\n') : 'Hiện tại không có voucher nào khả dụng.';

    return `Bạn là trợ lý ảo của cửa hàng đặc sản Miền Trung. Bạn chỉ được trả lời các câu hỏi liên quan đến sản phẩm, voucher và dịch vụ của cửa hàng.

DANH SÁCH SẢN PHẨM HIỆN CÓ:
${productList}

DANH SÁCH VOUCHER HIỆN CÓ:
${voucherList}

HƯỚNG DẪN:
- Chỉ trả lời các câu hỏi về sản phẩm, voucher, giá cả, khuyến mãi, số lượng tồn kho
- Khi nói về voucher, luôn đề cập mã voucher, điều kiện áp dụng và thời hạn
- Nếu được hỏi về điều không liên quan đến sản phẩm/voucher của cửa hàng, hãy lịch sự từ chối và hướng dẫn khách hàng hỏi về sản phẩm/voucher
- Luôn trả lời bằng tiếng Việt
- Phong cách thân thiện, nhiệt tình như một nhân viên bán hàng
- Khi nói về giá, luôn định dạng số với dấu phẩy (ví dụ: 250,000đ)
- Khi đề xuất voucher, ưu tiên các voucher còn hiệu lực và phù hợp với nhu cầu khách hàng

Bạn có thể giúp khách hàng tìm kiếm sản phẩm phù hợp, so sánh giá cả, tư vấn voucher tiết kiệm, hoặc đưa ra gợi ý về các món đặc sản Miền Trung.`;
};

// Gửi tin nhắn đến Gemini AI
export const sendMessageToGemini = async (message, conversationHistory = []) => {
    try {
        // Kiểm tra API key
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key') {
            return 'Chatbot chưa được cấu hình. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào file .env. Xem hướng dẫn trong file CHATBOT_SETUP.md';
        }

        // Lấy thông tin sản phẩm và voucher mới nhất
        const products = await getProductsContext();
        const vouchers = await getVouchersContext();
        const systemPrompt = createSystemPrompt(products, vouchers);

        // Tạo nội dung để gửi đến Gemini
        const fullPrompt = `${systemPrompt}\n\nLịch sử hội thoại:\n${conversationHistory.map(h => `${h.role}: ${h.content}`).join('\n')}\n\nKhách hàng hỏi: ${message}\n\nTrả lời:`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('API key invalid');
            }
            if (response.status === 404) {
                throw new Error('Model not found');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No response from Gemini AI');
        }
    } catch (error) {
        console.error('Error calling Gemini AI:', error);
        
        // Fallback response khi có lỗi
        if (error.message.includes('API key')) {
            return 'API key không hợp lệ. Vui lòng kiểm tra lại REACT_APP_GEMINI_API_KEY trong file .env';
        }
        
        if (error.message.includes('Model not found')) {
            return 'Model AI hiện không khả dụng. Vui lòng thử lại sau.';
        }
        
        return 'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này. Vui lòng thử lại sau hoặc liên hệ với nhân viên hỗ trợ.';
    }
};

// Kiểm tra xem câu hỏi có liên quan đến sản phẩm hoặc voucher không
export const isProductRelatedQuestion = (message) => {
    const productKeywords = [
        'sản phẩm', 'giá', 'mua', 'bán', 'đặc sản', 'miền trung',
        'bánh', 'mì', 'nem', 'cao lầu', 'gốm', 'thanh hà',
        'giảm giá', 'khuyến mãi', 'còn hàng', 'hết hàng',
        'đánh giá', 'chất lượng', 'ngon', 'đặt hàng',
        // Thêm từ khóa về voucher
        'voucher', 'mã giảm giá', 'mã khuyến mãi', 'giảm giá',
        'khuyến mại', 'ưu đãi', 'tiết kiệm', 'giảm tiền',
        'phiếu giảm giá', 'coupon', 'discount'
    ];
    
    const lowerMessage = message.toLowerCase();
    return productKeywords.some(keyword => lowerMessage.includes(keyword));
}; 