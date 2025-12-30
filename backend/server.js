const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: "PiChamp Arena Backend Running" });
});

// Example route for sandbox transaction verification
app.post('/verify-payment', (req, res) => {
  const { transactionId } = req.body;
  // TODO: call Pi Sandbox API to verify
  res.send({ status: 'success', transactionId });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
