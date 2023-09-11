const PORT = process.env.PORT ?? 8000 //this uses a port variable if it exists (e.g. if deployed on a service), otherwise port 8000
const express = require('express')
const app = express()

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))