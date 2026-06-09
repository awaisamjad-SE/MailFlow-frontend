import axios from 'axios';

export const DEFAULT_WEBHOOK_URL = '';

export const getWebhookUrl = () => {
  const saved = localStorage.getItem('mailflow-webhook-url');
  return saved || DEFAULT_WEBHOOK_URL;
};

export const setWebhookUrl = (url) => {
  if (url && url.trim() !== '') {
    localStorage.setItem('mailflow-webhook-url', url.trim());
  } else {
    localStorage.removeItem('mailflow-webhook-url');
  }
};

export const sendEmails = async (emails, onProgress) => {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    throw new Error('n8n Webhook URL is not configured. Please open Settings (cog icon in the header) and save your custom webhook URL first.');
  }
  
  // n8n handles max 100 per request, so chunk if needed
  const chunks = [];
  for (let i = 0; i < emails.length; i += 100) {
    chunks.push(emails.slice(i, i + 100));
  }

  const results = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const payload = chunk.length === 1
        ? { to: chunk[0].to, subject: chunk[0].subject, body: chunk[0].body, reply_to: chunk[0].reply_to || '' }
        : { emails: chunk.map(e => ({ to: e.to, subject: e.subject, body: e.body, reply_to: e.reply_to || '' })) };

      const response = await axios.post(webhookUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 300000, // 5 min timeout for large batches
      });

      results.push({ chunk: i + 1, success: true, data: response.data });
      if (onProgress) onProgress((i + 1) / chunks.length * 100, `Batch ${i + 1}/${chunks.length} sent`);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Unknown error';
      results.push({ chunk: i + 1, success: false, error: msg });
      if (onProgress) onProgress((i + 1) / chunks.length * 100, `Batch ${i + 1} failed: ${msg}`);
    }
  }

  return results;
};

export const sendSingleEmail = async (to, subject, body, replyTo = '') => {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    throw new Error('n8n Webhook URL is not configured. Please open Settings (cog icon in the header) and save your custom webhook URL first.');
  }

  const response = await axios.post(webhookUrl, {
    to, subject, body, reply_to: replyTo
  }, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
  });
  return response.data;
};
