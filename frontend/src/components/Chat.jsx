// src/components/Chat.jsx
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';

const Chat = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '400px', display: 'flex', flexDirection: 'column' }}>
      {/* Message List */}
      <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText primary={msg.sender} secondary={msg.text} />
          </ListItem>
        ))}
        {messages.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No messages yet.
          </Typography>
        )}
      </List>
      <Divider />
      {/* Message Input */}
      <Box sx={{ display: 'flex', p: 1 }}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chat;