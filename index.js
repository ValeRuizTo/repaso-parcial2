const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Función para obtener citas de Los Simpsons para un personaje específico
const getSimpsonsQuotes = async (character) => {
  try {
    // Hacer una solicitud a la API de citas de Los Simpsons para obtener citas para el personaje especificado
    const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${character}`);

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al obtener citas de Los Simpsons');
    }

    // Convertir la respuesta a formato JSON
    const quotes = await response.json();

    // Extraer las citas de la respuesta
    const quotesText = quotes.map(quote => quote.quote);

    return { character, quotes: quotesText };
  } catch (error) {
    console.error('Error al obtener citas de Los Simpsons:', error);
    throw new Error('Error al obtener citas de Los Simpsons');
  }
};

// Endpoint con una variable fija
app.get('/fixed-value', (req, res) => {
  const fixedValue = 'valorFijo';
  res.send(fixedValue);
});

// Endpoint para obtener citas de Los Simpsons para un personaje específico
app.get('/:character', async (req, res) => {
    try {
      // Obtener el nombre del personaje de los parámetros de la URL
      const character = req.params.character;
  
      // Obtener las citas de Los Simpsons utilizando la función asincrónica getSimpsonsQuotes
      const quotes = await getSimpsonsQuotes(character);
  
      // Devolver las citas en la respuesta como texto
      res.send(quotes.quotes.join('\n'));
    } catch (error) {
      res.status(500).send('Error al obtener citas de Los Simpsons');
    }
  });
  
// Endpoint con una variable normal
app.get('/normal-value/:variable', (req, res) => {
  const normalValue = req.params.variable;
  res.send(normalValue);
});

// Iniciar el servidor en el puerto 3000
app.listen(8080, () => {
  console.log('Servidor en ejecución en el puerto 8080');
});
