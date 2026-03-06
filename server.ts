import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';

async function startServer() {
  try {
    console.log('🚀 Starting server initialization...');
    const app = express();
    const PORT = process.env.PORT || 3000;
    console.log(`📍 Configured PORT: ${PORT}`);
    console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);

    app.use(cors());
    app.use(express.json({ limit: '10mb' }));

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next();
    });

    // API routes FIRST
    app.post('/api/send-aviso', async (req, res) => {
      try {
        const { aviso, pdfBase64 } = req.body;
        
        // Simulate sending WhatsApp
        console.log(`[WhatsApp] Sending PDF to Technical Manager for Aviso ${aviso.id}`);

        // Setup Nodemailer with Ethereal (fake SMTP)
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await transporter.sendMail({
          from: '"Sara Chatbot" <sara@feranclima.es>',
          to: 'responsable.tecnico@feranclima.es',
          subject: `Nuevo Aviso de Avería - ${aviso.id}`,
          text: `Hola, adjunto el nuevo aviso de avería de ${aviso.nombre}.`,
          attachments: [
            {
              filename: `Aviso_${aviso.id}.pdf`,
              content: pdfBase64.split(',')[1],
              encoding: 'base64'
            }
          ]
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({ success: true, previewUrl: nodemailer.getTestMessageUrl(info) });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
      }
    });

    // Vite middleware for development
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚙️ Running in development mode with Vite middleware');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.resolve(process.cwd(), 'dist');
      console.log(`📦 Running in production mode, serving static files from: ${distPath}`);
      app.use(express.static(distPath));
      app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server successfully running on port ${PORT}`);
    }).on('error', (err) => {
      console.error('❌ Server failed to start:', err);
    });
  } catch (error) {
    console.error('❌ Error during server initialization:', error);
  }
}

startServer();
