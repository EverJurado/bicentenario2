import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css'; // Importamos los estilos

function Chat() {
  const [pregunta, setPregunta] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const mensajesEndRef = useRef(null);

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    setMensajes(prev => [...prev, { tipo: 'user', texto: pregunta }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { pregunta });
      setMensajes(prev => [...prev, { tipo: 'bot', texto: res.data.respuesta }]);
    } catch (error) {
      setMensajes(prev => [...prev, {
        tipo: 'bot',
        texto: '⚠️ Error: ' + (error.response?.data?.error || 'No se pudo obtener respuesta')
      }]);
    }

    setPregunta('');
  };

  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Bicentenario 🇧🇴</div>

      <div className="chat-messages">
        {mensajes.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.tipo}`}>
            <div className="message-bubble">{msg.texto}</div>
          </div>
        ))}
        <div ref={mensajesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          placeholder="Escribe un mensaje..."
          className="chat-input"
        />
        <button onClick={enviarPregunta} className="chat-button">
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;
