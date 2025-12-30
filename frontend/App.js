import React, { useState } from "react";
import { verifyPayment } from "./api/paymentApi";

function App() {
  const [transactionId, setTransactionId] = useState("");
  const [response, setResponse] = useState(null);

  const handleVerify = async () => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    if (!BASE_URL) {
      alert("Backend URL is not set in .env file");
      return;
    }
    const result = await verifyPayment(transactionId, BASE_URL);
    setResponse(result);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>PiChamp Arena</h1>
      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        onClick={handleVerify}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        Verify Payment
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
