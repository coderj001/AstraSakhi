/* eslint-disable no-undef */
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

// Logging middleware
const apiLogger = (req, res, next) => {
   console.log('--- API Request ---');
   console.log('URL:', req.originalUrl);
   console.log('Method:', req.method);
   console.log('Headers:', req.headers);
   console.log('Body:', req.body);
   console.log('Random-UA:', req.randomUA);
   console.log('-------------------');
   next();
};

app.use(apiLogger);

app.get('/api/compatibility', async (req, res) => {
   const { signFirst, signSecond } = req.query;

   if (!signFirst || !signSecond) {
      return res.status(400).json({ error: 'signFirst and signSecond are required' });
   }

   const url = `https://api.prod.astrotalk.in/AstroTalk/compatibility/get/byname?signFirst=${signFirst}&signSecond=${signSecond}&languageId=1`;

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
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

app.get('/api/daily-horoscope', async (req, res) => {
   const url = `https://api.prod.astrotalk.in/AstroTalk/horoscope3/get?type=DAILY&zodiac=&languageId=1&timezone=Asia%2FKolkata`;

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': req.randomUA,
         },
      });

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
         data.data = data.data.map((item) => {
            const { weekDate, cheatId, month, time, id, ...rest } = item;
            return rest;
         });
      }

      res.status(response.status).json(data);
   } catch (error) {
      console.error('Daily horoscope proxy error:', error);
      res.status(500).json({ error: 'Daily horoscope proxy request failed' });
   }
});

app.get('/api/cities/autocomplete', async (req, res) => {
   const { key } = req.query;

   if (!key) {
      return res.status(400).json({ error: 'key is required' });
   }

   const url = `https://api.supportchat.astrotalk.com/AstroChat/cities/allcountries/autocomplete?limit=10&key=${key}`;

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Autocomplete proxy error:', error);
      res.status(500).json({ error: 'Autocomplete proxy request failed' });
   }
});

app.post('/api/matchmaking', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/combined/match_making';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Matchmaking proxy error:', error);
      res.status(500).json({ error: 'Matchmaking proxy request failed' });
   }
});

app.post('/api/kundli/ashtakvarga', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/ashtakvarga/complete';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Ashtakvarga proxy error:', error);
      res.status(500).json({ error: 'Ashtakvarga proxy request failed' });
   }
});

app.post('/api/kundli/divisional', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/combined/divisional';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Divisional proxy error:', error);
      res.status(500).json({ error: 'Divisional proxy request failed' });
   }
});

app.post('/api/kundli/dasha', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/dasha_complete';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Dasha proxy error:', error);
      res.status(500).json({ error: 'Dasha proxy request failed' });
   }
});

app.post('/api/kundli/report', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/combined/report';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Report proxy error:', error);
      res.status(500).json({ error: 'Report proxy request failed' });
   }
});

app.post('/api/kundli/general', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/combined/general';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('General proxy error:', error);
      res.status(500).json({ error: 'General proxy request failed' });
   }
});

app.post('/api/kundli/yogini-dasha', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/yogini_dasha_complete';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Yogini Dasha proxy error:', error);
      res.status(500).json({ error: 'Yogini Dasha proxy request failed' });
   }
});

app.post('/api/kundli/find-combination', async (req, res) => {
   const url = 'https://api.kundali.astrotalk.com/v1/find/combination';

   try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            origin: 'https://astrotalk.com',
            priority: 'u=1, i',
            referer: 'https://astrotalk.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': req.randomUA,
         },
         body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
   } catch (error) {
      console.error('Find Combination proxy error:', error);
      res.status(500).json({ error: 'Find Combination proxy request failed' });
   }
});

app.listen(port, () => {
   console.log(`Proxy server listening at http://localhost:${port}`);
});
