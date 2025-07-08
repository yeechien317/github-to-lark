const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

// 🔧 Replace with your Lark bot webhook URL
const LARK_WEBHOOK_URL = 'https://open.larksuite.com/open-apis/bot/v2/hook/3d040352-28a3-45c9-a68a-88aa39c58462'

app.post('/webhook', async (req, res) => {
  const payload = req.body

  // Handle Push Events
  if (payload.commits && payload.pusher) {
    const commits = payload.commits.map(c => `- ${c.message} by ${c.author.name} \n👉 ${c.url}`).join('\n')
    const message = `🔔 *${payload.pusher.name}* pushed to \`${payload.repository.name}\`:\n${commits}`

    try {
      await axios.post(LARK_WEBHOOK_URL, {
        msg_type: 'text',
        content: { text: message }
      })
      console.log('✅ Sent to Lark')
    } catch (err) {
      console.error('❌ Failed to send to Lark:', err.response?.data || err.message)
    }
  }

  res.sendStatus(200)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
