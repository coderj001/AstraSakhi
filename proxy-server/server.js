const express = require('express');
const cors = require('cors');
const userAgents = require('./user_agents');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Middleware to attach random User-Agent
const randomUserAgentMiddleware = (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  req.randomUA = userAgents[randomIndex];
  next();
};

app.use(randomUserAgentMiddleware);

app.get('/api/compatibility', async (req, res) => {
  const { signFirst, signSecond } = req.query;

  if (!signFirst || !signSecond) {
    return res.status(400).json({ error: 'signFirst and signSecond are required' });
  }

  const url = `https://api.prod.astrotalk.in/AstroTalk/compatibility/get/byname?signFirst=${signFirst}&signSecond=${signSecond}&languageId=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'origin': 'https://astrotalk.com',
        'priority': 'u=1, i',
        'referer': 'https://astrotalk.com/',
        'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': req.randomUA,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Compatibility proxy error:', error);
    res.status(500).json({ error: 'Compatibility proxy request failed' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});

