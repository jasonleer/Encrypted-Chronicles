# Encrypted Chronicles

**A Privacy-First Purchase Ledger Powered by Fully Homomorphic Encryption**

Encrypted Chronicles is a decentralized application that enables users to record and manage their purchase history on-chain with complete privacy. Using Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine), all purchase data remains encrypted at all times—even while being processed on the blockchain. Only the purchaser can decrypt their own transaction details, ensuring absolute confidentiality in an otherwise transparent blockchain environment.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Advantages](#advantages)
- [Problems Solved](#problems-solved)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running Locally](#running-locally)
  - [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Smart Contract Details](#smart-contract-details)
- [Frontend Application](#frontend-application)
- [Testing](#testing)
- [Future Roadmap](#future-roadmap)
- [Use Cases](#use-cases)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)
- [Support & Resources](#support--resources)

---

## Overview

In the modern digital economy, financial privacy is increasingly under threat. While blockchain technology offers transparency and immutability, it often comes at the cost of privacy—every transaction is publicly visible. Encrypted Chronicles addresses this fundamental challenge by leveraging cutting-edge Fully Homomorphic Encryption (FHE) technology to enable **private-by-design** purchase record management on Ethereum.

This project demonstrates a practical application of FHEVM where sensitive commercial data (item IDs, quantities, and prices) can be stored and verified on-chain without ever exposing the actual values to anyone except the authorized owner.

### What is Fully Homomorphic Encryption?

Fully Homomorphic Encryption (FHE) is a revolutionary cryptographic technique that allows computations to be performed directly on encrypted data without decrypting it first. This means:

- Data remains encrypted during storage, transmission, AND processing
- Smart contracts can validate and manipulate encrypted values
- Only authorized parties with the correct private keys can decrypt the results
- No trusted intermediaries or off-chain computation required

---

## Key Features

### Core Functionality

1. **Encrypted Purchase Recording**
   - Record purchase transactions with item ID, quantity, and unit price
   - All values are encrypted client-side before submission
   - Encryption happens through Zama's FHE protocol using the relayer SDK

2. **Privacy-Preserving Storage**
   - Purchase records are stored entirely on-chain in encrypted format
   - Even blockchain validators and node operators cannot access purchase details
   - Data remains encrypted at the smart contract level using FHEVM's native encrypted types

3. **Selective Decryption**
   - Only the wallet that created a purchase record can decrypt it
   - Granular access control managed through FHEVM's permission system
   - Users can view their complete purchase history with full details

4. **User-Friendly Interface**
   - Modern React-based web application
   - RainbowKit wallet integration for seamless Web3 authentication
   - Intuitive tabs for recording purchases and viewing history
   - Real-time transaction status updates

5. **Multi-Network Support**
   - Local development with Hardhat's FHEVM fork
   - Sepolia testnet deployment for public testing
   - Easy configuration for additional EVM-compatible networks

---

## Advantages

### 1. **True On-Chain Privacy**
Unlike traditional blockchain applications where all data is publicly visible, Encrypted Chronicles ensures that sensitive purchase information remains completely confidential while still being verifiable on-chain.

### 2. **No Centralized Intermediaries**
The application operates entirely on-chain without requiring trusted third parties to manage encryption keys or process sensitive data. Users maintain full control of their data through their wallet's private keys.

### 3. **Regulatory Compliance Ready**
By keeping financial data encrypted, the system provides a foundation for compliance with privacy regulations like GDPR, CCPA, and financial privacy laws, while maintaining blockchain's auditability benefits.

### 4. **Immutable and Verifiable**
Purchase records benefit from blockchain's immutability while maintaining privacy. Records cannot be tampered with or deleted, providing a reliable audit trail for the owner.

### 5. **Composable Privacy**
Built on FHEVM, the system can be extended with additional privacy-preserving features like encrypted analytics, confidential reporting, and private business logic.

### 6. **Gas-Efficient Operations**
Despite using advanced cryptography, FHEVM's optimized implementation ensures reasonable gas costs for encrypted operations, making privacy-preserving applications practical.

### 7. **Developer-Friendly**
Uses familiar tools like Hardhat, Ethers.js, and React, lowering the barrier to entry for developers interested in building privacy-preserving dApps.

### 8. **Future-Proof Design**
As FHE technology continues to advance and become more efficient, the application will naturally benefit from performance improvements without architectural changes.

---

## Problems Solved

### Problem 1: Blockchain Transparency vs. Privacy Dilemma

**Challenge:** Traditional blockchains are fully transparent, making all transaction details publicly visible. This is problematic for commercial applications where purchase history, pricing strategies, and consumption patterns are sensitive business intelligence.

**Solution:** Encrypted Chronicles uses FHEVM to store all sensitive data in encrypted form. Purchase details are cryptographically protected while still being stored and processed on-chain, eliminating the transparency-privacy trade-off.

### Problem 2: Off-Chain Privacy Solutions Create Trust Issues

**Challenge:** Many existing privacy solutions rely on off-chain computation, centralized servers, or trusted execution environments, reintroducing centralization risks and single points of failure.

**Solution:** By using FHE, all computation happens directly on the blockchain in a decentralized manner. No off-chain components or trusted third parties are required for maintaining privacy.

### Problem 3: Limited Consumer Financial Privacy

**Challenge:** In the Web3 ecosystem, anyone can track a wallet's complete transaction history, purchase patterns, and financial behavior, creating significant privacy concerns for consumers and businesses.

**Solution:** With encrypted purchase records, users can maintain a complete on-chain purchase history without revealing what they bought, how much they paid, or their consumption patterns to surveillance or competitors.

### Problem 4: Difficulty Building Private Business Applications

**Challenge:** Businesses need privacy for competitive advantage (pricing strategies, inventory levels, customer data), but blockchain's transparency makes it difficult to build confidential business applications.

**Solution:** Encrypted Chronicles provides a blueprint for building privacy-preserving business applications on blockchain, demonstrating how FHE can enable confidential commerce while maintaining blockchain's benefits.

### Problem 5: Data Ownership and Control

**Challenge:** In traditional e-commerce systems, platforms own customer purchase data, creating privacy risks, data breaches, and misuse of personal information.

**Solution:** Users own their encrypted purchase records through their wallet's private keys. No platform or intermediary has access to decrypt user data, returning data ownership to individuals.

### Problem 6: Compliance with Privacy Regulations

**Challenge:** Blockchain's immutability and transparency conflict with privacy regulations like GDPR's "right to be forgotten" and data minimization principles.

**Solution:** By keeping data encrypted on-chain with user-controlled decryption, the system provides a technical foundation for regulatory compliance while maintaining blockchain's integrity.

---

## Technology Stack

### Smart Contract Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| **Solidity** | ^0.8.24 | Smart contract programming language |
| **FHEVM** | ^0.8.0 | Zama's Fully Homomorphic Encryption library for Solidity |
| **Hardhat** | ^2.26.0 | Ethereum development environment |
| **@fhevm/hardhat-plugin** | ^0.1.0 | Hardhat plugin for FHEVM support |
| **TypeChain** | ^8.3.2 | TypeScript bindings for smart contracts |

### Frontend Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.1 | UI framework |
| **TypeScript** | ~5.8.3 | Type-safe JavaScript |
| **Vite** | ^7.1.6 | Build tool and development server |
| **Wagmi** | ^2.17.0 | React hooks for Ethereum |
| **RainbowKit** | ^2.2.8 | Wallet connection UI |
| **ethers.js** | ^6.15.0 | Ethereum library |
| **Viem** | ^2.37.6 | TypeScript interface for Ethereum |
| **@tanstack/react-query** | ^5.89.0 | Data fetching and state management |

### Encryption & Privacy

| Technology | Version | Purpose |
|------------|---------|---------|
| **@zama-fhe/relayer-sdk** | ^0.3.0-2 | Client-side FHE operations and relayer communication |
| **encrypted-types** | ^0.0.4 | Type definitions for encrypted values |

### Development & Testing

| Technology | Purpose |
|------------|---------|
| **Mocha** | Test framework |
| **Chai** | Assertion library |
| **Hardhat Network Helpers** | Testing utilities |
| **Solidity Coverage** | Code coverage analysis |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Hardhat Gas Reporter** | Gas usage analysis |

### Deployment & Infrastructure

| Technology | Purpose |
|------------|---------|
| **hardhat-deploy** | Deployment management |
| **Infura** | Ethereum node provider |
| **Etherscan** | Contract verification |
| **Sepolia Testnet** | Public test network |

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Web Browser                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Frontend (Vite)                    │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Wallet Connection (RainbowKit + Wagmi)        │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  FHE Client (@zama-fhe/relayer-sdk)            │  │   │
│  │  │  - Encrypts data before sending                 │  │   │
│  │  │  - Requests decryption permissions              │  │   │
│  │  │  - Decrypts retrieved encrypted values          │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Web3 RPC (ethers.js)
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                  Ethereum Network (Sepolia)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         EncryptedPurchaseLedger.sol                   │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  State Variables:                               │  │   │
│  │  │  mapping(address => PurchaseRecord[])           │  │   │
│  │  │                                                  │  │   │
│  │  │  struct PurchaseRecord {                        │  │   │
│  │  │    euint32 itemId;        // Encrypted          │  │   │
│  │  │    euint32 quantity;      // Encrypted          │  │   │
│  │  │    euint64 unitPrice;     // Encrypted          │  │   │
│  │  │    uint64 timestamp;      // Public             │  │   │
│  │  │  }                                               │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Functions:                                      │  │   │
│  │  │  - recordPurchase() : Store encrypted record    │  │   │
│  │  │  - getPurchaseCount() : Get record count        │  │   │
│  │  │  - getPurchaseRecord() : Get single record      │  │   │
│  │  │  - getPurchaseRecords() : Get all records       │  │   │
│  │  │  - getLatestPurchase() : Get most recent        │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         FHEVM Protocol (Zama)                         │   │
│  │  - Handles encrypted computations on-chain           │   │
│  │  - Manages decryption permissions                    │   │
│  │  - Provides encrypted type operations (euintXX)      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Recording a Purchase (Encryption Flow)

1. **User Input:** User enters item ID, quantity, and unit price in the frontend
2. **Client-Side Encryption:**
   - Zama Relayer SDK encrypts the values using FHEVM's encryption scheme
   - Generates cryptographic proof (`inputProof`) for the encrypted values
   - Creates encrypted handles for each value (`externalEuint32/64`)
3. **Transaction Submission:**
   - Frontend sends transaction with encrypted handles and proof
   - Smart contract receives encrypted data via `recordPurchase()`
4. **On-Chain Processing:**
   - Contract validates encryption proof using `FHE.fromExternal()`
   - Converts external encrypted handles to internal encrypted types (`euint32/euint64`)
   - Creates `PurchaseRecord` struct with encrypted values
   - Stores record in user's purchase array
5. **Permission Management:**
   - Contract grants decryption permission to itself (`FHE.allowThis()`)
   - Contract grants decryption permission to the user (`FHE.allow()`)
6. **Event Emission:** Emits `PurchaseRecorded` event with public metadata

#### Retrieving Purchases (Decryption Flow)

1. **Query Contract:** Frontend calls `getPurchaseRecords(address)` or similar function
2. **Receive Encrypted Data:** Contract returns `PurchaseRecord[]` with encrypted values
3. **Client-Side Decryption:**
   - Frontend requests decryption through Zama Relayer SDK
   - Relayer verifies user has decryption permission on-chain
   - User's private key is used to decrypt each encrypted value
4. **Display:** Decrypted values are displayed in the frontend UI

### Smart Contract Architecture

**File:** `contracts/EncryptedPurchaseLedger.sol`

- **Inheritance:** Extends `SepoliaConfig` from FHEVM (provides network-specific configuration)
- **Storage Pattern:** Uses mapping of addresses to dynamic arrays for per-user record storage
- **Encryption Types:**
  - `euint32` for item IDs and quantities (32-bit encrypted unsigned integers)
  - `euint64` for unit prices (64-bit encrypted unsigned integers for larger price values)
  - `externalEuint32/64` for receiving encrypted inputs from external sources
- **Access Control:** Leverages FHEVM's built-in permission system rather than OpenZeppelin's access control

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
  ```bash
  node --version  # Should output v20.x.x or higher
  ```
- **npm**: Version 7.0.0 or higher (comes with Node.js)
  ```bash
  npm --version  # Should output 7.x.x or higher
  ```
- **Git**: For cloning the repository
  ```bash
  git --version
  ```
- **MetaMask or Compatible Wallet**: Browser extension for interacting with the dApp

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Encrypted-Chronicles.git
   cd Encrypted-Chronicles
   ```

2. **Install Smart Contract Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd app
   npm install
   cd ..
   ```

### Configuration

#### Smart Contract Configuration

1. **Set Environment Variables**

   Create a `.env` file in the root directory:
   ```bash
   # For deploying to Sepolia testnet
   INFURA_API_KEY=your_infura_api_key_here
   PRIVATE_KEY=your_wallet_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key_here  # Optional, for verification
   ```

   Alternatively, use Hardhat's configuration variables:
   ```bash
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set PRIVATE_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

2. **Get Sepolia ETH**

   To deploy to Sepolia testnet, you'll need test ETH:
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Or use [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
   - Send Sepolia ETH to your deployment wallet address

#### Frontend Configuration

Update the contract addresses in `app/src/config/contracts.ts` after deployment:

```typescript
export const CONTRACT_ADDRESS = "0x..."; // Your deployed contract address
```

### Running Locally

#### Option 1: Using Hardhat Local Node

1. **Compile Contracts**
   ```bash
   npm run compile
   ```

2. **Start Local FHEVM Node**
   ```bash
   npx hardhat node
   ```
   This starts a local Ethereum node with FHEVM support on `http://localhost:8545`

3. **Deploy Contracts (in a new terminal)**
   ```bash
   npx hardhat deploy --network localhost
   ```
   Note the deployed contract address from the output.

4. **Update Frontend Configuration**

   Edit `app/src/config/contracts.ts` with your local contract address.

5. **Start Frontend Development Server**
   ```bash
   cd app
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

6. **Connect Wallet**
   - Open `http://localhost:5173` in your browser
   - Click "Connect Wallet" and select MetaMask
   - Add the local network to MetaMask if prompted:
     - Network Name: Hardhat Local
     - RPC URL: http://localhost:8545
     - Chain ID: 31337
     - Currency Symbol: ETH

#### Option 2: Using Existing Sepolia Deployment

If you prefer to use the already-deployed contract on Sepolia:

1. **Update Frontend Configuration**

   Edit `app/src/config/wagmi.ts` to use Sepolia:
   ```typescript
   import { sepolia } from 'wagmi/chains';

   export const config = createConfig({
     chains: [sepolia],
     // ... rest of config
   });
   ```

2. **Start Frontend**
   ```bash
   cd app
   npm run dev
   ```

3. **Connect to Sepolia**
   - Ensure MetaMask is connected to Sepolia testnet
   - Connect your wallet to the dApp

### Deployment

#### Deploy to Sepolia Testnet

1. **Ensure Configuration**
   Verify your `.env` file contains valid `INFURA_API_KEY` and `PRIVATE_KEY`

2. **Deploy Contract**
   ```bash
   npx hardhat deploy --network sepolia
   ```

   Save the contract address from the deployment output.

3. **Verify Contract on Etherscan (Optional)**
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

4. **Update Frontend**
   - Edit `app/src/config/contracts.ts` with the Sepolia contract address
   - Ensure `app/src/config/wagmi.ts` is configured for Sepolia

5. **Build and Deploy Frontend**
   ```bash
   cd app
   npm run build
   ```

   Deploy the `app/dist` directory to your hosting provider (Vercel, Netlify, IPFS, etc.)

#### Deploy to Production Networks

The same deployment process can be used for mainnet or other networks:

1. **Add Network Configuration** to `hardhat.config.ts`
2. **Set Appropriate RPC URLs** in your environment variables
3. **Deploy:** `npx hardhat deploy --network <network-name>`

---

## Project Structure

```
Encrypted-Chronicles/
│
├── contracts/                          # Smart contracts
│   └── EncryptedPurchaseLedger.sol    # Main purchase ledger contract
│
├── deploy/                             # Deployment scripts
│   └── deploy.ts                       # Hardhat-deploy script
│
├── tasks/                              # Custom Hardhat tasks
│   ├── accounts.ts                     # List accounts task
│   └── EncryptedPurchaseLedger.ts     # Contract interaction tasks
│
├── test/                               # Contract tests
│   ├── EncryptedPurchaseLedger.ts     # Local network tests
│   └── EncryptedPurchaseLedgerSepolia.ts  # Sepolia network tests
│
├── app/                                # Frontend application
│   ├── src/
│   │   ├── components/                 # React components
│   │   │   ├── Header.tsx             # Application header
│   │   │   ├── PurchaseApp.tsx        # Main app component
│   │   │   ├── PurchaseForm.tsx       # Purchase recording form
│   │   │   └── PurchaseHistory.tsx    # Purchase history viewer
│   │   │
│   │   ├── config/                     # Configuration files
│   │   │   ├── contracts.ts           # Contract addresses and ABIs
│   │   │   └── wagmi.ts               # Wagmi/RainbowKit configuration
│   │   │
│   │   ├── hooks/                      # Custom React hooks
│   │   │   ├── useZamaInstance.ts     # Hook for FHE instance
│   │   │   └── useEthersSigner.ts     # Hook for ethers signer
│   │   │
│   │   ├── styles/                     # CSS stylesheets
│   │   ├── App.tsx                     # Root app component
│   │   └── main.tsx                    # Application entry point
│   │
│   ├── public/                         # Static assets
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.ts                  # Vite configuration
│   └── tsconfig.json                   # TypeScript configuration
│
├── hardhat.config.ts                   # Hardhat configuration
├── package.json                        # Project dependencies
├── tsconfig.json                       # TypeScript configuration
├── .gitignore                          # Git ignore rules
├── .env                                # Environment variables (not tracked)
└── README.md                           # This file
```

---

## Smart Contract Details

### EncryptedPurchaseLedger.sol

**Contract Address (Sepolia):** `[To be added after deployment]`

#### Core Data Structures

```solidity
struct PurchaseRecord {
    euint32 itemId;       // Encrypted item identifier
    euint32 quantity;     // Encrypted quantity purchased
    euint64 unitPrice;    // Encrypted unit price (in wei or smallest unit)
    uint64 timestamp;     // Public timestamp of record creation
}
```

#### Key Functions

##### `recordPurchase`
```solidity
function recordPurchase(
    externalEuint32 itemIdHandle,
    externalEuint32 quantityHandle,
    externalEuint64 unitPriceHandle,
    bytes calldata inputProof
) external
```

Records a new encrypted purchase entry for the caller.

- **Parameters:**
  - `itemIdHandle`: Encrypted item identifier handle from client
  - `quantityHandle`: Encrypted quantity handle from client
  - `unitPriceHandle`: Encrypted unit price handle from client
  - `inputProof`: Cryptographic proof generated by relayer
- **Access:** Public, anyone can record their own purchases
- **Events:** Emits `PurchaseRecorded(address indexed user, uint256 indexed index, uint64 timestamp)`
- **Gas Cost:** ~300,000-500,000 gas (varies based on encryption operations)

##### `getPurchaseCount`
```solidity
function getPurchaseCount(address user) external view returns (uint256)
```

Returns the total number of purchase records for a given user.

- **Parameters:**
  - `user`: Ethereum address to query
- **Returns:** Number of purchase records
- **Access:** Public view function

##### `getPurchaseRecord`
```solidity
function getPurchaseRecord(address user, uint256 index)
    external view returns (PurchaseRecord memory)
```

Retrieves a specific purchase record by index.

- **Parameters:**
  - `user`: Ethereum address of the purchaser
  - `index`: Zero-based index of the record
- **Returns:** PurchaseRecord struct with encrypted values
- **Access:** Public view function (but only owner can decrypt the encrypted fields)

##### `getPurchaseRecords`
```solidity
function getPurchaseRecords(address user)
    external view returns (PurchaseRecord[] memory)
```

Retrieves all purchase records for a given user.

- **Parameters:**
  - `user`: Ethereum address to query
- **Returns:** Array of PurchaseRecord structs
- **Access:** Public view function

##### `getLatestPurchase`
```solidity
function getLatestPurchase(address user)
    external view returns (PurchaseRecord memory)
```

Retrieves the most recent purchase record for a user.

- **Parameters:**
  - `user`: Ethereum address to query
- **Returns:** Latest PurchaseRecord struct
- **Access:** Public view function

#### Security Features

1. **Automatic Permission Management:**
   - Contract automatically grants decryption permissions during `recordPurchase()`
   - Only the purchaser receives decryption rights
   - Permissions are managed by FHEVM's secure permission system

2. **Proof Verification:**
   - All encrypted inputs must include valid cryptographic proofs
   - FHEVM validates proofs on-chain before processing

3. **Immutable Records:**
   - Once recorded, purchase records cannot be modified or deleted
   - Provides tamper-proof audit trail

---

## Frontend Application

### Component Overview

#### `PurchaseApp.tsx`
Main application component that manages tab navigation between recording purchases and viewing history.

- **State Management:** Uses React hooks for tab state and refresh triggers
- **Web3 Integration:** Connects to Wagmi for wallet state
- **FHE Integration:** Initializes Zama instance for encryption operations

#### `PurchaseForm.tsx`
Form component for recording new encrypted purchases.

- **Features:**
  - Input fields for item ID, quantity, and unit price
  - Client-side validation
  - Encryption using Zama Relayer SDK
  - Transaction status feedback
  - Error handling and user notifications

#### `PurchaseHistory.tsx`
Component for displaying user's purchase history with decryption.

- **Features:**
  - Fetches all purchase records from smart contract
  - Decrypts encrypted values for display
  - Formatted display of purchase details
  - Loading states and error handling
  - Responsive design for mobile and desktop

#### `Header.tsx`
Navigation header with wallet connection.

- **Features:**
  - RainbowKit wallet connection button
  - Network indicator
  - Application branding

### Custom Hooks

#### `useZamaInstance`
Manages the Zama FHE instance lifecycle.

```typescript
const { instance, isLoading, error } = useZamaInstance();
```

- Initializes FHE client
- Handles relayer connection
- Provides loading and error states

#### `useEthersSigner`
Bridges Wagmi's wallet connector with ethers.js signer.

```typescript
const signer = useEthersSigner();
```

- Converts Viem client to ethers signer
- Used for contract interactions

### Styling

The application uses modern CSS with:
- CSS custom properties for theming
- Flexbox and Grid layouts
- Responsive design patterns
- Smooth animations and transitions

---

## Testing

### Running Tests

#### Local Network Tests

```bash
# Run all tests on local Hardhat network
npm run test

# Run with gas reporting
REPORT_GAS=true npm run test

# Run with coverage
npm run coverage
```

#### Sepolia Testnet Tests

```bash
# Run tests on live Sepolia network
npm run test:sepolia
```

Note: Sepolia tests require actual deployed contracts and testnet ETH.

### Test Coverage

The test suite covers:

1. **Basic Functionality**
   - Recording purchases with encrypted values
   - Retrieving purchase counts
   - Fetching individual and multiple records

2. **Encryption/Decryption**
   - Verifying encrypted values can be decrypted by owner
   - Confirming encrypted values remain encrypted on-chain
   - Testing decryption with correct values

3. **Access Control**
   - Ensuring only record owner can decrypt values
   - Verifying unauthorized users cannot decrypt
   - Testing permission system integrity

4. **Edge Cases**
   - Empty purchase history
   - Multiple records per user
   - Large values and edge values
   - Timestamp accuracy

### Testing Philosophy

Tests are written using:
- **Mocha**: Test framework
- **Chai**: Assertion library with FHEVM-specific matchers
- **FHEVM Mock Environment**: Simulates FHE operations locally

---

## Future Roadmap

### Phase 1: Enhanced Privacy Features (Q2 2025)

- **Encrypted Analytics**
  - Compute total spending without revealing individual purchases
  - Calculate average purchase amounts while maintaining privacy
  - Generate encrypted statistics for users

- **Confidential Categories**
  - Add encrypted category field to purchases
  - Enable category-based filtering without revealing category names
  - Support hierarchical encrypted categories

- **Time-Range Queries**
  - Query purchases within encrypted time ranges
  - Generate encrypted reports for specific periods
  - Support date-based aggregations

### Phase 2: Advanced Functionality (Q3 2025)

- **Multi-User Features**
  - Selective sharing of encrypted records with other addresses
  - Temporary decryption permissions with time-based expiry
  - Encrypted collaborative records (family/business accounts)

- **Encrypted Search**
  - Search through encrypted item IDs
  - Filter by encrypted price ranges
  - Query by encrypted quantities

- **Integration APIs**
  - RESTful API for third-party integrations
  - Webhook support for record events
  - SDK for easier integration

### Phase 3: Enterprise Features (Q4 2025)

- **Organizational Accounts**
  - Multi-signature support for organization purchase records
  - Role-based access control with encrypted permissions
  - Encrypted audit logs for compliance

- **Export and Reporting**
  - Encrypted export formats
  - Compliance report generation
  - Encrypted backup and restore

- **Advanced Cryptographic Features**
  - Zero-knowledge proofs for additional privacy
  - Threshold encryption for shared records
  - Post-quantum encryption readiness

### Phase 4: Cross-Chain and Scaling (Q1 2026)

- **Multi-Chain Support**
  - Deploy to multiple EVM chains
  - Cross-chain encrypted record synchronization
  - Bridge support for encrypted data transfer

- **Layer 2 Integration**
  - Optimized deployment on Layer 2 solutions
  - Reduced gas costs through L2 scaling
  - Maintain privacy on L2 networks

- **Performance Optimization**
  - Batch operations for multiple records
  - Gas optimization for encrypted operations
  - Efficient storage patterns for large-scale use

### Phase 5: Ecosystem Expansion (Q2 2026)

- **DeFi Integration**
  - Use encrypted purchase history as credit score
  - Encrypted collateral based on purchase records
  - Privacy-preserving lending protocols

- **Marketplace Integration**
  - Direct integration with e-commerce platforms
  - Encrypted loyalty programs
  - Privacy-preserving recommendation systems

- **Mobile Applications**
  - Native iOS and Android apps
  - Mobile wallet integration
  - QR code scanning for quick purchases

### Long-Term Vision

- **Decentralized Identity Integration**
  - Link encrypted purchase history to decentralized identities
  - Reputation systems based on encrypted transaction history
  - Privacy-preserving credential verification

- **AI and Machine Learning**
  - Privacy-preserving ML models trained on encrypted data
  - Encrypted predictive analytics
  - Personalized recommendations without data exposure

- **Regulatory and Compliance Tools**
  - Built-in GDPR compliance features
  - Encrypted audit trails for regulators
  - Selective disclosure protocols for legal compliance

---

## Use Cases

### 1. Consumer Privacy Protection

**Scenario:** Individual consumers want to track their purchases on-chain without revealing buying habits to surveillance, marketers, or competitors.

**Solution:** Users record purchases in Encrypted Chronicles, maintaining a complete purchase history that only they can access.

**Benefits:**
- Complete privacy from blockchain observers
- Portable purchase history across platforms
- User-controlled data ownership

### 2. B2B Confidential Commerce

**Scenario:** Businesses need to record supplier purchases without revealing pricing strategies, supplier relationships, or procurement volumes to competitors.

**Solution:** Companies use the platform to maintain encrypted procurement records on-chain, ensuring confidentiality while maintaining immutable records.

**Benefits:**
- Competitive advantage through pricing confidentiality
- Transparent audit trail for internal compliance
- Tamper-proof supplier transaction records

### 3. Healthcare Purchase Records

**Scenario:** Healthcare providers need to track medical supply purchases while complying with privacy regulations like HIPAA.

**Solution:** Medical facilities record equipment and supply purchases with encrypted details, maintaining compliance while benefiting from blockchain's immutability.

**Benefits:**
- HIPAA-compliant purchase tracking
- Immutable audit trail for compliance
- Privacy for sensitive medical purchases

### 4. Luxury Goods Authentication

**Scenario:** Luxury goods buyers want provenance tracking without revealing purchase prices or personal buying habits.

**Solution:** Each luxury item purchase is recorded with encrypted details, creating a chain of custody that verifies authenticity without exposing sensitive details.

**Benefits:**
- Verify item authenticity
- Maintain price confidentiality
- Protect buyer privacy

### 5. Research and Grant Spending

**Scenario:** Research institutions must track grant spending transparently for funders while maintaining confidentiality of sensitive research expenditures.

**Solution:** Institutions record purchases with encrypted details, allowing authorized auditors to verify appropriate spending without exposing proprietary research activities.

**Benefits:**
- Transparent accountability to funders
- Protection of research confidentiality
- Compliant with grant requirements

### 6. Whistleblower-Safe Corporate Tracking

**Scenario:** Organizations want internal tracking systems that prevent individual employee purchases from being used for retaliation.

**Solution:** Employee purchases are recorded with encryption, allowing aggregate reporting while protecting individual employee privacy.

**Benefits:**
- Employee privacy protection
- Prevent retaliation risks
- Accurate spending tracking

---

## Security Considerations

### Smart Contract Security

1. **Auditing Status**
   - Contract is based on Zama's audited FHEVM library
   - Custom logic should be audited before production deployment
   - Consider formal verification for critical paths

2. **Known Limitations**
   - Records cannot be deleted (immutable by design)
   - Gas costs for encrypted operations are higher than plaintext
   - Decryption requires off-chain relayer for key generation

3. **Best Practices Implemented**
   - No external calls in critical functions
   - Reentrancy not applicable (no value transfers)
   - Input validation through FHEVM proof system
   - Minimal complexity in core logic

### Frontend Security

1. **Private Key Management**
   - Never exposes wallet private keys
   - Encryption keys handled by wallet provider
   - No sensitive data stored in browser storage

2. **Network Security**
   - HTTPS required for production deployment
   - Content Security Policy recommended
   - Subresource Integrity for CDN resources

3. **Input Validation**
   - Client-side validation before encryption
   - Type checking with TypeScript
   - Boundary checks for numeric inputs

### Cryptographic Considerations

1. **FHE Security**
   - Based on TFHE (Fast Fully Homomorphic Encryption over the Torus)
   - Security level equivalent to 128-bit security
   - Relies on Learning With Errors (LWE) hardness assumption

2. **Key Management**
   - Encryption keys derived from wallet signatures
   - Decryption keys never leave the user's device
   - Permission system enforced on-chain

3. **Proof System**
   - Zero-knowledge proofs validate encrypted inputs
   - Prevents malicious encrypted value injection
   - Ensures data integrity during encryption

### Operational Security

1. **Deployment Security**
   - Use hardware wallets for deployment keys
   - Verify contract bytecode before deployment
   - Use multi-signature for contract upgrades (if applicable)

2. **Monitoring**
   - Monitor contract for unusual activity
   - Set up alerts for large value operations
   - Track gas price spikes

3. **Incident Response**
   - Have emergency pause procedures (if implemented)
   - Document incident response plan
   - Maintain communication channels with users

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**
   - Open an issue with detailed reproduction steps
   - Include error messages and screenshots
   - Specify environment details (OS, browser, node version)

2. **Suggest Features**
   - Open an issue with the feature request label
   - Describe the use case and expected behavior
   - Discuss implementation considerations

3. **Submit Pull Requests**
   - Fork the repository
   - Create a feature branch
   - Write tests for new functionality
   - Ensure all tests pass
   - Follow code style guidelines
   - Submit PR with clear description

### Development Guidelines

1. **Code Style**
   - Follow existing code formatting
   - Run `npm run lint` before committing
   - Use `npm run prettier:write` to format code

2. **Testing**
   - Write tests for all new features
   - Maintain or improve code coverage
   - Test on local network before Sepolia

3. **Documentation**
   - Update README for significant changes
   - Add inline comments for complex logic
   - Update type definitions

4. **Commit Messages**
   - Use clear, descriptive commit messages
   - Reference issue numbers when applicable
   - Follow conventional commit format

### Getting Help

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and community discussions
- **Discord/Telegram:** [Add your community links]

---

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

### Key Points

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Patent grant explicitly excluded
- ℹ️ Liability and warranty disclaimers apply

See the [LICENSE](LICENSE) file for full details.

### Third-Party Licenses

This project uses:
- **FHEVM**: BSD-3-Clause-Clear (Zama)
- **Hardhat**: MIT License
- **React**: MIT License
- **Other dependencies**: See individual package licenses

---

## Support & Resources

### Official Documentation

- **FHEVM Documentation:** https://docs.zama.ai/fhevm
- **FHEVM Hardhat Plugin:** https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat
- **FHEVM Testing Guide:** https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test
- **Zama Academy:** https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial

### Community

- **Zama Discord:** https://discord.gg/zama
- **GitHub Issues:** [Report bugs or request features](https://github.com/zama-ai/fhevm/issues)
- **X (Twitter):** [@zama_fhe](https://twitter.com/zama_fhe)
- **Blog:** https://www.zama.ai/blog

### Learning Resources

1. **Tutorials**
   - [FHEVM Quick Start](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial)
   - [Writing FHE Smart Contracts](https://docs.zama.ai/protocol/solidity-guides/development-guide/smart-contract)
   - [Testing FHEVM Contracts](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)

2. **Example Projects**
   - [FHEVM Examples Repository](https://github.com/zama-ai/fhevm)
   - [FHEVM Hardhat Template](https://github.com/zama-ai/fhevm-hardhat-template)

3. **Research Papers**
   - [TFHE: Fast Fully Homomorphic Encryption over the Torus](https://eprint.iacr.org/2018/421)
   - [Zama Whitepaper](https://www.zama.ai/whitepaper)

### Technical Support

For project-specific issues:
1. Check existing GitHub issues
2. Review documentation and examples
3. Open a new issue with detailed information
4. Join community discussions on Discord

For FHEVM-related questions:
- Zama Documentation: https://docs.zama.ai
- Zama Discord: https://discord.gg/zama

---

## Acknowledgments

This project is built upon:

- **Zama's FHEVM**: For making fully homomorphic encryption practical and accessible on Ethereum
- **Hardhat**: For the excellent Ethereum development environment
- **OpenZeppelin**: For security best practices and patterns
- **RainbowKit**: For seamless wallet connection UX
- **Viem/Wagmi**: For modern Ethereum React hooks and TypeScript support

Special thanks to the privacy-focused blockchain community for pioneering work in confidential computing on public ledgers.

---

## FAQ

### General Questions

**Q: Is my purchase data really private?**
A: Yes. All sensitive data (item IDs, quantities, prices) is encrypted using Fully Homomorphic Encryption before being sent to the blockchain. Only you hold the decryption key (your wallet's private key), so only you can decrypt your purchase records.

**Q: Can the smart contract developer see my data?**
A: No. Even the contract deployer cannot decrypt your purchase records. The decryption key is derived from your wallet's private key, which only you control.

**Q: Is this production-ready?**
A: The current version is a demonstration/prototype. While it uses audited FHEVM libraries, you should conduct security audits and thorough testing before using it in production with real financial data.

**Q: What are the gas costs?**
A: Encrypted operations are more expensive than regular blockchain transactions. Recording a purchase costs approximately 300,000-500,000 gas. Reading encrypted data is less expensive. Gas optimization is an ongoing area of FHEVM development.

### Technical Questions

**Q: How does FHE differ from zero-knowledge proofs?**
A: FHE allows computations on encrypted data without decryption, while zero-knowledge proofs prove statements about data without revealing the data. FHE is ideal for confidential state storage and computation; ZK proofs are ideal for verification without disclosure. They're complementary technologies.

**Q: Can I modify records after creation?**
A: No. Records are immutable by design to maintain integrity and provide a tamper-proof audit trail. If you need to correct a record, you must create a new record.

**Q: Does this work on Ethereum mainnet?**
A: FHEVM is currently optimized for test networks. Mainnet deployment depends on Zama's FHEVM roadmap and gas cost optimization. Check Zama's documentation for the latest deployment status.

**Q: How long does decryption take?**
A: Decryption is performed off-chain via the Zama relayer and typically takes 1-3 seconds per encrypted value, depending on network conditions.

**Q: Can I integrate this with my existing dApp?**
A: Yes! The contract can be integrated with any Ethereum-compatible application. You'll need to integrate the Zama Relayer SDK for encryption/decryption functionality.

---

**Built with privacy in mind | Powered by Zama FHEVM**

---

## Contact

For inquiries, partnerships, or custom implementations:

- **GitHub:** [Your GitHub Profile]
- **Email:** [Your Email]
- **Website:** [Your Website]

---

**Last Updated:** October 31, 2025
**Version:** 0.1.0
