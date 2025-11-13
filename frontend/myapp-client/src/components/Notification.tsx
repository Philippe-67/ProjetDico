import * as React from 'react';

export interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => (
  <div className={`notification ${type}`}>
    <span>{message}</span>
    {onClose && (
      <button className="close-btn" onClick={onClose} aria-label="Fermer la notification">×</button>
    )}
  </div>
);

export default Notification;
