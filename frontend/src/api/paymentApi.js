import axios from 'axios';

export const verifyPayment = async (transactionId, baseUrl) => {
  try {
    const response = await axios.post(`${baseUrl}/verify-payment`, { transactionId });
    return response.data;
  } catch (error) {
    return { status: 'error', error: error.message };
  }
};
