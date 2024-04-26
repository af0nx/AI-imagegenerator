import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState('');

  const model = 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';

  const fetchOutputFromBackend = async () => {
    try {
      const response = await axios.post('http://localhost:4000/run-replicate', {
        prompt // Enviar o prompt para o backend
      });
      setOutput(response.data);
    } catch (error) {
      console.error('Erro ao fazer requisição ao backend:', error);
    }
  };

  return (
    <div>
      <h1>Frontend</h1>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} // Atualizar o estado do prompt quando o valor do input mudar
        placeholder="Digite o prompt"
      />
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
