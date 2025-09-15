import { useEffect, useRef, useState, type JSX } from 'react';

function ConfirmationModal(): JSX.Element {
  const [status, setStatus] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen && openBtnRef.current) {
      openBtnRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && confirmBtnRef.current) {
      confirmBtnRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setStatus('Confirmed');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setStatus('Cancelled');
  };

  const onKeyDownBackdrop = (e: any) => {
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="modal-container">
      <button ref={openBtnRef} className="open-modal-btn" data-testid="open-modal-button" onClick={handleOpen}>
        Open Confirmation Modal
      </button>

      {isOpen && (
        <div className="modal-backdrop" onKeyDown={onKeyDownBackdrop} aria-hidden={false}>
          <div
            className="modal-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-message"
            data-testid="confirmation-modal"
          >
            <h2 id="modal-title" className="modal-title" data-testid="modal-title">
              Confirm Action
            </h2>

            <p id="modal-message" className="modal-message" data-testid="modal-message">
              Are you sure you want to proceed?
            </p>

            <div className="modal-buttons">
              <button ref={confirmBtnRef} className="confirm-btn" onClick={handleConfirm} data-testid="confirm-button">
                Confirm
              </button>
              <button className="cancel-btn" onClick={handleCancel} data-testid="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="action-status" data-testid="action-status" aria-live="polite">
        {status}
      </div>
    </div>
  );
}

export default ConfirmationModal;
