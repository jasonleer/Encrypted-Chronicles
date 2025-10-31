import { useEffect, useMemo, useState } from 'react';
import type { JsonRpcSigner } from 'ethers';
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import '../styles/PurchaseHistory.css';

type PurchaseHistoryProps = {
  address?: `0x${string}`;
  zamaInstance: any;
  zamaLoading: boolean;
  zamaError: string | null;
  signerPromise?: Promise<JsonRpcSigner>;
  refreshKey: number;
};

type RawPurchaseRecord = readonly [string, string, string, bigint];

type PurchaseRecordView = {
  index: number;
  itemId: string;
  quantity: string;
  unitPrice: string;
  timestamp: number;
};

type DecryptedPurchase = {
  itemId: number;
  quantity: number;
  unitPrice: bigint;
};

export function PurchaseHistory({
  address,
  zamaInstance,
  zamaLoading,
  zamaError,
  signerPromise,
  refreshKey,
}: PurchaseHistoryProps) {
  const [decryptingIndex, setDecryptingIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [decryptedRecords, setDecryptedRecords] = useState<Record<number, DecryptedPurchase>>({});

  const { data: rawRecords, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPurchaseRecords',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  useEffect(() => {
    setDecryptedRecords({});
    setErrorMessage(null);
    if (address) {
      refetch();
    }
  }, [address, refreshKey, refetch]);

  const purchases: PurchaseRecordView[] = useMemo(() => {
    if (!rawRecords || !Array.isArray(rawRecords)) {
      return [];
    }

    return (rawRecords as RawPurchaseRecord[]).map((record, index) => ({
      index,
      itemId: record[0],
      quantity: record[1],
      unitPrice: record[2],
      timestamp: Number(record[3]),
    }));
  }, [rawRecords]);

  const decryptRecord = async (record: PurchaseRecordView) => {
    if (!address) {
      setErrorMessage('Connect your wallet to decrypt purchases.');
      return;
    }

    if (!zamaInstance) {
      setErrorMessage('Encryption service is still preparing. Try again shortly.');
      return;
    }

    if (!signerPromise) {
      setErrorMessage('Wallet signer unavailable. Reconnect your wallet and retry.');
      return;
    }

    setDecryptingIndex(record.index);
    setErrorMessage(null);

    try {
      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Wallet signer unavailable');
      }

      const keypair = zamaInstance.generateKeypair();
      const handleContractPairs = [
        { handle: record.itemId, contractAddress: CONTRACT_ADDRESS },
        { handle: record.quantity, contractAddress: CONTRACT_ADDRESS },
        { handle: record.unitPrice, contractAddress: CONTRACT_ADDRESS },
      ];

      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '10';
      const contractAddresses = [CONTRACT_ADDRESS];

      const eip712 = zamaInstance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays,
      );

      const signature = await signer.signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message,
      );

      const result = (await zamaInstance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays,
      )) as Record<string, string>;

      const decrypted: DecryptedPurchase = {
        itemId: Number(result[record.itemId] ?? 0),
        quantity: Number(result[record.quantity] ?? 0),
        unitPrice: BigInt(result[record.unitPrice] ?? '0'),
      };

      setDecryptedRecords((previous) => ({
        ...previous,
        [record.index]: decrypted,
      }));
    } catch (error) {
      console.error('Failed to decrypt purchase', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Unable to decrypt purchase: ${message}`);
    } finally {
      setDecryptingIndex(null);
    }
  };

  if (!address) {
    return (
      <div className="purchase-history-container">
        <div className="empty-state">
          <h2 className="empty-state-title">Connect your wallet to view history</h2>
          <p className="empty-state-description">
            Your purchases remain private and can only be decrypted by you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-history-container">
      <div className="history-card">
        <h2 className="history-title">My Purchase History</h2>
        <p className="history-subtitle">Encrypted purchase details stay hidden until you request a decryption.</p>

        {zamaError ? <p className="alert alert-error">Encryption initialization failed: {zamaError}</p> : null}
        {errorMessage ? <p className="alert alert-error">{errorMessage}</p> : null}

        {isLoading || zamaLoading ? (
          <p className="status-message">Loading encrypted records…</p>
        ) : null}

        {!isLoading && purchases.length === 0 ? (
          <div className="empty-state">
            <h3 className="empty-state-title">No purchases recorded yet</h3>
            <p className="empty-state-description">
              Submit a purchase on the "Record Purchase" tab to populate your private ledger.
            </p>
          </div>
        ) : null}

        <ul className="purchase-list">
          {purchases.map((record) => {
            const decrypted = decryptedRecords[record.index];
            const recordedAt = new Date(record.timestamp * 1000).toLocaleString();

            return (
              <li key={record.index} className="purchase-list-item">
                <div className="purchase-list-header">
                  <span className="purchase-index">#{record.index + 1}</span>
                  <span className="purchase-timestamp">Recorded {recordedAt}</span>
                </div>

                <div className="purchase-details-grid">
                  <div>
                    <p className="detail-label">Item ID</p>
                    <p className="detail-value">{decrypted ? decrypted.itemId : '***'}</p>
                  </div>
                  <div>
                    <p className="detail-label">Quantity</p>
                    <p className="detail-value">{decrypted ? decrypted.quantity : '***'}</p>
                  </div>
                  <div>
                    <p className="detail-label">Unit Price</p>
                    <p className="detail-value">
                      {decrypted ? decrypted.unitPrice.toString() : '***'}
                    </p>
                  </div>
                </div>

                <button
                  className="decrypt-button"
                  onClick={() => decryptRecord(record)}
                  disabled={decryptingIndex === record.index || zamaLoading}
                >
                  {decryptingIndex === record.index ? 'Decrypting…' : 'Decrypt this purchase'}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
