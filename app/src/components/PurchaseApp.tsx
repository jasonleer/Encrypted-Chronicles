import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Header } from './Header';
import { PurchaseForm } from './PurchaseForm';
import { PurchaseHistory } from './PurchaseHistory';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import '../styles/PurchaseApp.css';

type ActiveTab = 'record' | 'history';

export function PurchaseApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('record');
  const [refreshKey, setRefreshKey] = useState(0);
  const { address } = useAccount();
  const zama = useZamaInstance();
  const signerPromise = useEthersSigner();

  const handleSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="purchase-app">
      <Header />
      <main className="main-content">
        <div className="tab-navigation">
          <nav className="tab-nav">
            <button
              onClick={() => setActiveTab('record')}
              className={`tab-button ${activeTab === 'record' ? 'active' : 'inactive'}`}
            >
              Record Purchase
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`tab-button ${activeTab === 'history' ? 'active' : 'inactive'}`}
            >
              My History
            </button>
          </nav>
        </div>

        {activeTab === 'record' && (
          <PurchaseForm
            address={address}
            zamaInstance={zama.instance}
            zamaLoading={zama.isLoading}
            zamaError={zama.error}
            signerPromise={signerPromise}
            onSubmitted={handleSubmitted}
          />
        )}

        {activeTab === 'history' && (
          <PurchaseHistory
            key={refreshKey}
            address={address}
            zamaInstance={zama.instance}
            zamaLoading={zama.isLoading}
            zamaError={zama.error}
            signerPromise={signerPromise}
            refreshKey={refreshKey}
          />
        )}
      </main>
    </div>
  );
}
