import React from 'react';

const MessageRenderer = ({ content }) => {
    // Function để parse và render markdown content
    const parseMarkdown = (text) => {
        // Split text thành các đoạn
        const lines = text.split('\n');
        const elements = [];
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Skip empty lines
            if (!trimmedLine) {
                elements.push(<br key={`br-${index}`} />);
                return;
            }
            
            // Handle bullet points
            if (trimmedLine.startsWith('* ')) {
                const bulletContent = trimmedLine.substring(2);
                elements.push(
                    <div key={index} className="bullet-point">
                        <span className="bullet">•</span>
                        <span className="bullet-content">
                            {renderFormattedText(bulletContent)}
                        </span>
                    </div>
                );
                return;
            }
            
            // Regular paragraphs
            elements.push(
                <p key={index} className="message-paragraph">
                    {renderFormattedText(trimmedLine)}
                </p>
            );
        });
        
        return elements;
    };
    
    // Function để render bold text và other formatting
    const renderFormattedText = (text) => {
        // Handle bold text (**text**)
        const parts = text.split(/(\*\*.*?\*\*)/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const boldText = part.slice(2, -2);
                return <strong key={index} className="bold-text">{boldText}</strong>;
            }
            
            // Highlight price information
            const priceMatches = part.match(/(\d{1,3}(?:,\d{3})*đ)/g);
            if (priceMatches) {
                const priceHighlighted = part.replace(/(\d{1,3}(?:,\d{3})*đ)/g, '<span class="price-highlight">$1</span>');
                return <span key={index} dangerouslySetInnerHTML={{ __html: priceHighlighted }} />;
            }
            
            // Highlight percentage discounts
            const discountMatches = part.match(/(\d+%)/g);
            if (discountMatches) {
                const discountHighlighted = part.replace(/(\d+%)/g, '<span class="discount-highlight">$1</span>');
                return <span key={index} dangerouslySetInnerHTML={{ __html: discountHighlighted }} />;
            }
            
            // Highlight ratings
            const ratingMatches = part.match(/(\d+\/5 sao)/g);
            if (ratingMatches) {
                const ratingHighlighted = part.replace(/(\d+\/5 sao)/g, '<span class="rating-highlight">⭐ $1</span>');
                return <span key={index} dangerouslySetInnerHTML={{ __html: ratingHighlighted }} />;
            }
            
            // Highlight voucher codes
            const voucherCodeMatches = part.match(/(Mã:\s*[A-Z0-9-]+)/g);
            if (voucherCodeMatches) {
                const voucherHighlighted = part.replace(/(Mã:\s*[A-Z0-9-]+)/g, '<span class="voucher-code-highlight">🎫 $1</span>');
                return <span key={index} dangerouslySetInnerHTML={{ __html: voucherHighlighted }} />;
            }
            
            // Highlight status icons
            const statusMatches = part.match(/(✅|❌)/g);
            if (statusMatches) {
                const statusHighlighted = part.replace(/(✅)/g, '<span class="status-valid">$1</span>')
                                              .replace(/(❌)/g, '<span class="status-invalid">$1</span>');
                return <span key={index} dangerouslySetInnerHTML={{ __html: statusHighlighted }} />;
            }
            
            return part;
        });
    };
    
    return (
        <div className="message-content-rendered">
            {parseMarkdown(content)}
        </div>
    );
};

export default MessageRenderer; 