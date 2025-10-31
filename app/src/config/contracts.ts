export const CONTRACT_ADDRESS = '0x3D6405B06Dd8267647024bE699e150D5b20c3684';

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      }
    ],
    "name": "PurchaseRecorded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getLatestPurchase",
    "outputs": [
      {
        "components": [
          {
            "internalType": "euint32",
            "name": "itemId",
            "type": "bytes32"
          },
          {
            "internalType": "euint32",
            "name": "quantity",
            "type": "bytes32"
          },
          {
            "internalType": "euint64",
            "name": "unitPrice",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "timestamp",
            "type": "uint64"
          }
        ],
        "internalType": "struct EncryptedPurchaseLedger.PurchaseRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPurchaseCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getPurchaseRecord",
    "outputs": [
      {
        "components": [
          {
            "internalType": "euint32",
            "name": "itemId",
            "type": "bytes32"
          },
          {
            "internalType": "euint32",
            "name": "quantity",
            "type": "bytes32"
          },
          {
            "internalType": "euint64",
            "name": "unitPrice",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "timestamp",
            "type": "uint64"
          }
        ],
        "internalType": "struct EncryptedPurchaseLedger.PurchaseRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPurchaseRecords",
    "outputs": [
      {
        "components": [
          {
            "internalType": "euint32",
            "name": "itemId",
            "type": "bytes32"
          },
          {
            "internalType": "euint32",
            "name": "quantity",
            "type": "bytes32"
          },
          {
            "internalType": "euint64",
            "name": "unitPrice",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "timestamp",
            "type": "uint64"
          }
        ],
        "internalType": "struct EncryptedPurchaseLedger.PurchaseRecord[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "hasPurchases",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "protocolId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "externalEuint32",
        "name": "itemIdHandle",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint32",
        "name": "quantityHandle",
        "type": "bytes32"
      },
      {
        "internalType": "externalEuint64",
        "name": "unitPriceHandle",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "recordPurchase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export type PurchaseRecordStruct = {
  itemId: `0x${string}`;
  quantity: `0x${string}`;
  unitPrice: `0x${string}`;
  timestamp: bigint;
};
