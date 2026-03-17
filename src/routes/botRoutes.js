import express from 'express';

export const createBotRoutes = (botController) => {
    const router = express.Router();

    router.post('/webhook', async (req, res) => {
        try {
            await botController.handleCallback(req.body.callback_query);
            res.send('OK');
        } catch (error) {
            console.error('Webhook error:', error);
            res.status(500).send('Error');
        }
    });

    router.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    return router;
};
