import axios from 'axios';
import { Analytics } from '@segment/analytics-node';

export default async function handler(req, res) {
  const requestMethod = req.method;

  // Check if SEGMENT_SERVER_WRITEKEY is defined
  const segmentServerWriteKey = process.env.SEGMENT_SERVER_WRITEKEY;
  if (!segmentServerWriteKey) {
    console.error('SEGMENT_SERVER_WRITEKEY is not defined');
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  const analytics = new Analytics({
    writeKey: segmentServerWriteKey,
  });

  try {
    switch (requestMethod) {
      case 'GET':
        res.status(200).json({
          message: `Get requests are not supported. Did you mean to make a POST request?`,
        });
        break;

      case 'POST':
        try {
          const receivedData = req.body;
          const { anonymousId, properties } = receivedData.event;
          const { path, referrer, search, title, url } = properties || {};

          console.log('heres the url:', url);

          analytics.page({
            anonymousId,
            properties: {
              path,
              referrer,
              search,
              title,
              url,
            },
          });

          res.status(200).json({ message: 'Hey it worked in stape routes this time' });
        } catch (error) {
          console.error('Error processing received data:', error);
          res.status(500).json({ error: 'Error processing received data' });
        }
        break;

      default:
        res.status(200).json({ message: 'Welcome to API Routes!' });
        break;
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {};
