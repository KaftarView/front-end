import React, { useState, useEffect } from 'react';
import './BuyTicket.css';
import ReCAPTCHA from 'react-google-recaptcha';
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
  quantity?: number;
}

interface ticketsType {
  ticketID : number;
  quantity : number;
}

interface payload {
  tickets : ticketsType[];
  discountCode : string | null;
}

 const TicketPurchasePopup: React.FC<{ onClose: () => void ; id:string|undefined }> = ({ onClose  , id}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tickets, setTickets] = useState<Record<number, number>>({});
  const [ticketTypes, setTicketTypes] = useState<Ticket[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        // setError(err.response?.data?.message || 'An error occurred while fetching tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleQuantityChange = (id: number, value: number) => {
    setTickets({ ...tickets, [id]: Math.max(0, value) });
  };

  const calculateTotal = () => {
    return Object.entries(tickets).reduce((total, [id, quantity]) => {
      const ticket = ticketTypes.find((t) => t.id === parseInt(id));
      return total + (ticket?.price || 0) * quantity;
    }, 0);
  };

  const handleSubmit = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = () => {
    console.log('Final Ticket Purchase:', tickets, 'Discount Code:', discountCode);
    onClose();
  };

  const handleApplyDiscount = async () => {
    const formattedTickets : ticketsType[] = Object.entries(tickets)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketID, quantity]) => ({
        ticketID: parseInt(ticketID),
        quantity,
      }));

  
    if (formattedTickets.length === 0) {
      setError('Please select at least one ticket to proceed.');
      return;
    }
  
    const pay : payload = {
      tickets : formattedTickets,
      discountCode : discountCode ,
    }
    // const payload = {
    //   tickets: formattedTickets,
    //   discountCode : discountCode ,
    // };
    console.log(pay)
    setLoading(true);
    setError(null);
  
    try {
      
      const response = await apiClient.post(`/v1/events/${id}/reserve`, pay);
      console.log('Purchase successful:', response.data);
      // onClose(); // Close the popup after successful submission
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during purchase.');
    } finally {
      setLoading(false);
    }
  };
  const renderTicketSelection = () => (
    <>
      <h2>بلیت های موجود</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="tickets-container-buy-popup">
          {ticketTypes.map((ticket) => (
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
                <select
                  value={tickets[ticket.id] || 0}
                  onChange={(e) => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                >
                  {[...Array(ticket.quantity ? ticket.quantity + 1 : 0)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
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
        />
        <button className="apply-button-buy-popup" onClick={handleApplyDiscount}>اعمال</button>
      </div>

      <div className="total-section-buy-popup">
        <span>کل:</span>
        <span className="total-amount-buy-popup">{calculateTotal().toLocaleString()} تومان</span>
      </div>

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
      <h2 className="invoice-header-buy-popup">پیش فاکتور</h2>
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
                  <td>{(ticket?.price || 0) * quantity} تومان</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <h3 className="invoice-total-buy-popup">جمع: {calculateTotal()} تومان</h3>
      <div className="invoice-buttons-buy-popup">
        <button onClick={handleBack}>برگشت</button>
        <button onClick={handleFinalSubmit}>تایید و پرداخت</button>
        {/* <ReCAPTCHA sitekey={process.env.VITE_RECAPTCHA_SITE_KEY} /> */}
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

// const EventComponent: React.FC = () => {
//   const [isPopupVisible, setPopupVisible] = useState(false);

//   return (
//     <div>
//       <h1>Event Title</h1>
//       <button onClick={() => setPopupVisible(true)}>خرید بلیت</button>

//       {isPopupVisible && <TicketPurchasePopup onClose={() => setPopupVisible(false)} />}
//     </div>
//   );
// };

export default TicketPurchasePopup;
