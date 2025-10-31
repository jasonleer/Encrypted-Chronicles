import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { JsonRpcSigner } from 'ethers';
import { Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import '../styles/PurchaseForm.css';

type PurchaseFormProps = {
  address?: `0x${string}`;
  zamaInstance: any;
  zamaLoading: boolean;
  zamaError: string | null;
  signerPromise?: Promise<JsonRpcSigner>;
  onSubmitted?: () => void;
};

type FormState = {
  itemId: string;
  quantity: string;
  price: string;
};

export function PurchaseForm({
  address,
  zamaInstance,
  zamaLoading,
  zamaError,
  signerPromise,
  onSubmitted,
}: PurchaseFormProps) {
  const [formState, setFormState] = useState<FormState>({ itemId: '', quantity: '', price: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormState({ itemId: '', quantity: '', price: '' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address) {
      setErrorMessage('Connect your wallet to record a purchase.');
      return;
    }

    if (!zamaInstance) {
      setErrorMessage('Encryption service is not ready yet. Please wait a moment and try again.');
      return;
    }

    if (!signerPromise) {
      setErrorMessage('Unable to access your wallet signer. Please reconnect your wallet.');
      return;
    }

    const itemId = Number(formState.itemId);
    if (!Number.isInteger(itemId) || itemId <= 0) {
      setErrorMessage('Item ID must be a positive integer.');
      return;
    }

    const quantity = Number(formState.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      setErrorMessage('Quantity must be a positive integer.');
      return;
    }

    if (!/^\d+$/.test(formState.price)) {
      setErrorMessage('Unit price must be provided as an integer (for example, in cents).');
      return;
    }
    const price = BigInt(formState.price);
    if (price <= BigInt(0)) {
      setErrorMessage('Unit price must be greater than zero.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Wallet signer unavailable');
      }

      const encryptedInput = await zamaInstance
        .createEncryptedInput(CONTRACT_ADDRESS, address)
        .add32(itemId)
        .add32(quantity)
        .add64(price)
        .encrypt();

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.recordPurchase(
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.handles[2],
        encryptedInput.inputProof,
      );

      await tx.wait();

      setStatusMessage('Purchase recorded successfully!');
      resetForm();
      onSubmitted?.();
    } catch (error) {
      console.error('Failed to record purchase', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Failed to record purchase: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!address) {
    return (
      <div className="purchase-form-container">
        <div className="empty-state">
          <h2 className="empty-state-title">Connect your wallet to start</h2>
          <p className="empty-state-description">
            Link your wallet above to encrypt and store your personal purchase history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-form-container">
      <div className="purchase-card">
        <h2 className="purchase-card-title">Record a Purchase</h2>
        <p className="purchase-card-subtitle">
          Item ID, quantity, and unit price are encrypted with Zama FHE before being stored on-chain.
        </p>

        {zamaError ? <p className="alert alert-error">Encryption initialization failed: {zamaError}</p> : null}

        <form className="purchase-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Item ID</label>
              <input
                type="number"
                min="1"
                value={formState.itemId}
                onChange={handleChange('itemId')}
                placeholder="e.g. 42"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                value={formState.quantity}
                onChange={handleChange('quantity')}
                placeholder="e.g. 3"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Unit Price (integer)</label>
            <input
              type="number"
              min="1"
              value={formState.price}
              onChange={handleChange('price')}
              placeholder="Enter value in your smallest unit (e.g. cents)"
              className="form-input"
              required
            />
            <p className="form-help">Use integers only. Decimals should be converted into the smallest currency unit.</p>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || zamaLoading}
          >
            {zamaLoading ? 'Preparing encryption...' : isSubmitting ? 'Submitting…' : 'Encrypt & Submit'}
          </button>
        </form>

        {statusMessage ? <p className="alert alert-success">{statusMessage}</p> : null}
        {errorMessage ? <p className="alert alert-error">{errorMessage}</p> : null}
      </div>
    </div>
  );
}
