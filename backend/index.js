import express from 'express';
import Replicate from 'replicate';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Configurar o middleware do CORS
app.use(cors());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
});

app.post('/run-replicate', async (req, res) => {
  const model = 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';
  const input = {
    width: 768,
    height: 768,
    prompt: 'an monkey with a pillow',
    refine: 'expert_ensemble_refiner',
    scheduler: 'K_EULER',
    lora_scale: 0.6,
    num_outputs: 1,
    guidance_scale: 7.5,
    apply_watermark: false,
    high_noise_frac: 0.8,
    negative_prompt: '',
    prompt_strength: 0.8,
    num_inference_steps: 25,
  };

  console.log({ model, input });
  console.log('Running...');

  try {
    const output = await replicate.run(model, { input });
    console.log('Done!', output);
    res.json(output);
  } catch (error) {
    console.error('Erro ao executar o replicate:', error);
    res.status(500).json({ error: 'Erro ao executar o replicate' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
