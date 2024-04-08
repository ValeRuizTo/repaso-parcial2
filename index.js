const express = require('express');
const fetch = require('node-fetch');

const app = express();

// Endpoint para obtener citas de Los Simpsons para un personaje específico
app.get('/simpsons-quotes', async (req, res) => {
  try {
    // Obtener el nombre del personaje del parámetro de consulta
    const character = req.query.character;

    // Verificar si se proporcionó el nombre del personaje
    if (!character) {
      return res.status(400).json({ error: 'Se requiere el parámetro "character"' });
    }

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

    // Devolver las citas en la respuesta
    res.json({ character, quotes: quotesText });
  } catch (error) {
    console.error('Error al obtener citas de Los Simpsons:', error);
    res.status(500).json({ error: 'Error al obtener citas de Los Simpsons' });
  }
});

// Endpoint con una variable fija
app.get('/fixed-value', (req, res) => {
  const fixedValue = 'valorFijo';
  res.json({ fixedValue });
});

// Endpoint con una variable normal
app.get('/normal-value/:variable', (req, res) => {
  const normalValue = req.params.variable;
  res.json({ normalValue });
});

// Iniciar el servidor en el puerto 3000
app.listen(8080, () => {
  console.log('Servidor en ejecución en el puerto 8080');
});
