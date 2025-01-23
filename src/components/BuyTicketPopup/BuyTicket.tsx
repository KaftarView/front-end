import React, { useState, useEffect } from 'react';
import './BuyTicket.css';
import apiClient from '../../utils/apiClient';

interface Ticket {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  availableFrom: string;
  availableUntil: string;
  createdAt: string;
  description?: string;
  quantity: number;
}

interface ticketsType {
  ticketID: number;
  quantity: number;
}

// interface payload {
//   tickets: ticketsType[];
//   discountCode: string | null;
// }

const TicketPurchasePopup: React.FC<{ onClose: () => void; id: string | undefined }> = ({ onClose, id }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tickets, setTickets] = useState<Record<number, number>>({});
  const [ticketTypes, setTicketTypes] = useState<Ticket[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false); // New loading state for discount
  const [error, setError] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [reserveId, setReserveId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/v1/events/${id}/tickets`, {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
        });
        const fetchedTickets = response.data.data;
        setTicketTypes(fetchedTickets);
        setTickets(
          fetchedTickets.reduce(
            (acc: Record<number, number>, ticket: Ticket) => ({
              ...acc,
              [ticket.id]: 0,
            }),
            {}
          )
        );
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [id]);

  const handleQuantityChange = (id: number, value: number) => {
    setTickets({ ...tickets, [id]: Math.max(0, value) });
  };

  const calculateTotal = () => {
    return Object.entries(tickets).reduce((total, [id, quantity]) => {
      const ticket = ticketTypes.find((t) => t.id === parseInt(id));
      return total + (ticket?.price || 0) * quantity;
    }, 0);
  };

  const handleSubmit = async () => {
    if(!reserveId)
    {
      const formattedTickets: ticketsType[] = Object.entries(tickets)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketID, quantity]) => ({
        ticketID: parseInt(ticketID),
        quantity,
      }));

      if (formattedTickets.length === 0) {
        setError('Please select at least one ticket to proceed.');
        return;
      }

      const pay = {
        tickets: formattedTickets,
      };

      // setDiscountLoading(true); 
      // setError(null);

      try {
        const response = await apiClient.post(`/v1/events/${id}/reserve`, pay);
        setFinalPrice(response.data.data.finalPrice);
        if (response.data.statusCode === 200) {
          setReserveId(response.data.data.id);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred during purchase.');
      } finally {
        setDiscountLoading(false); // Clear discount-specific loading state
      }
    }
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await apiClient.post(`/v1/events/${id}/purchase/${reserveId}`);
      alert(response.data.message);
      console.log(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while purchasing tickets.');
      alert(err.response?.data?.message || 'An error occurred while purchasing tickets.')
    } finally {
      setLoading(false);
    }
    onClose();
  };

  const handleApplyDiscount = async () => {
    const formattedTickets: ticketsType[] = Object.entries(tickets)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketID, quantity]) => ({
        ticketID: parseInt(ticketID),
        quantity,
      }));

    if (formattedTickets.length === 0) {
      setError('Please select at least one ticket to proceed.');
      return;
    }

    const pay = {
      tickets: formattedTickets,
      discountCode: discountCode,
    };

    setDiscountLoading(true); // Use discount-specific loading state
    setError(null);

    try {
      const response = await apiClient.post(`/v1/events/${id}/reserve`, pay);
      setFinalPrice(response.data.data.finalPrice);
      if (response.data.statusCode === 200) {
        setReserveId(response.data.data.id);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during purchase.');
    } finally {
      setDiscountLoading(false); // Clear discount-specific loading state
    }
  };

  const renderTotal = () => {
    const originalTotal = calculateTotal();
    
    if (discountLoading) { // Use discount-specific loading state
      return (
        <div className="total-section-buy-popup">
          <span>کل:</span>
          <span className="total-amount-buy-popup">
            <div className="loading-spinner"></div>
            در حال محاسبه...
          </span>
        </div>
      );
    }

    if (finalPrice !== null && finalPrice !== originalTotal) {
      return (
        <div className="total-section-buy-popup">
          <span>کل:</span>
          <span className="total-amount-buy-popup discounted">
            <span className="original-price">{originalTotal.toLocaleString()} تومان</span>
            <span className="new-price">{finalPrice.toLocaleString()} تومان</span>
          </span>
        </div>
      );
    }

    return (
      <div className="total-section-buy-popup">
        <span>کل:</span>
        <span className="total-amount-buy-popup">{originalTotal.toLocaleString()} تومان</span>
      </div>
    );
  };

  const renderTicketSelection = () => (
    <>
      <h2>بلیت های موجود</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="loading-spinner"></div>
          <p>در حال بارگذاری...</p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="tickets-container-buy-popup">
          {ticketTypes && ticketTypes.map((ticket) => (
            <div key={ticket.id} className="ticket-row-buy-popup">
              <div className="ticket-info-buy-popup">
                <div className="ticket-header-buy-popup">
                  <span className="ticket-title-buy-popup">{ticket.name}</span>
                </div>
                <div className="ticket-details-buy-popup">
                  {ticket.description && (
                    <span className="ticket-description-buy-popup">{ticket.description}</span>
                  )}
                </div>
              </div>
              <div className="ticket-quantity-buy-popup">
                <span className="ticket-price-buy-popup">{ticket.price.toLocaleString()} تومان</span>
                <input
                  className="choose-ticket-count"
                  type="number"
                  value={tickets[ticket.id] || 0}
                  min="0"
                  max={ticket.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 0 && value <= ticket.quantity) {
                      handleQuantityChange(ticket.id, value);
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value > ticket.quantity) {
                      handleQuantityChange(ticket.id, ticket.quantity);
                    } else if (value < 0 || isNaN(value)) {
                      handleQuantityChange(ticket.id, 0);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="discount-section-buy-popup">
        <input
          type="text"
          placeholder="کد تخفیف"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={discountLoading} // Use discount-specific loading state
        />
        <button 
          className="apply-button-buy-popup" 
          onClick={handleApplyDiscount}
          disabled={discountLoading || !discountCode.trim()} // Use discount-specific loading state
        >
          {discountLoading ? ( // Use discount-specific loading state
            <>
              <div className="loading-spinner"></div>
              <span>در حال اعمال...</span>
            </>
          ) : (
            'اعمال'
          )}
        </button>
      </div>

      {renderTotal()}

      <button
        className="submit-button-buy-popup"
        onClick={handleSubmit}
        disabled={Object.values(tickets).every((v) => v === 0)}
      >
        خرید بلیت
      </button>
    </>
  );

  const renderPreInvoice = () => (
    <div className="invoice-container-buy-popup">
      <h2 className="invoice-header-buy-popup">{reserveId}پیش فاکتور</h2>
      <table className="invoice-table-buy-popup">
        <thead>
          <tr>
            <th>نوع بلیت</th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>جمع</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tickets).map(([id, quantity]) => {
            const ticket = ticketTypes.find((t) => t.id === parseInt(id));
            if (quantity > 0) {
              return (
                <tr key={id}>
                  <td>{ticket?.name}</td>
                  <td>{ticket?.price.toLocaleString()} تومان</td>
                  <td>{quantity}</td>
                  <td>{finalPrice !== null ? finalPrice.toLocaleString() : calculateTotal().toLocaleString()}  تومان</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <h3 className="invoice-total-buy-popup">
        جمع: {finalPrice !== null ? finalPrice.toLocaleString() : calculateTotal().toLocaleString()} تومان
      </h3>
      <div className="invoice-buttons-buy-popup">
        <button onClick={handleBack}>برگشت</button>
        <button onClick={handleFinalSubmit}>تایید و پرداخت</button>
      </div>
    </div>
  );

  return (
    <div className="buy-popup-overlay">
      <div className="buy-popup-content">
        <button className="close-button-buy-popup" onClick={onClose}>
          ×
        </button>
        {currentStep === 1 ? renderTicketSelection() : renderPreInvoice()}
      </div>
    </div>
  );
};

export default TicketPurchasePopup;