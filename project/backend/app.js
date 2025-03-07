const express = require('express');
const cors = require('cors');
const templateRoutes = require('./routes/templateRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/template', templateRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));