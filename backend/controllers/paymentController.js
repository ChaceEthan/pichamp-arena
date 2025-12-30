const axios = require('axios');
exports.verifyPayment = async (req, res) => {
  const { transactionId } = req.body;

  if (!transactionId) {
    return res.status(400).send({ status: 'error', message: 'transactionId missing' });
  }

  try {
    const response = await axios.get(`${process.env.PI_SANDBOX_URL}/v1/transactions/${transactionId}`, {
      headers: { 'x-api-key': process.env.PI_SANDBOX_KEY }
    });

    res.send({ status: 'success', transaction: response.data });
  } catch (error) {
    console.error('Sandbox verification error:', error.message);
    res.status(500).send({ status: 'error', error: error.message });
  }
};
