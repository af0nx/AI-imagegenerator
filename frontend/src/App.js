import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [output, setOutput] = useState(null);

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

  const fetchOutputFromBackend = async () => {
    try {
      const response = await axios.post('http://localhost:4000/run-replicate', {
        model,
        input
      });
      setOutput(response.data);
    } catch (error) {
      console.error('Erro ao fazer requisição ao backend:', error);
    }
  };

  return (
    <div>
      <h1>Frontend</h1>
      <button onClick={fetchOutputFromBackend}>Executar Replicate no Backend</button>
      {output && (
        <div>
          <h2>Resultado do Backend:</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
