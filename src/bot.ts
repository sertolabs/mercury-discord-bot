import Discord from 'discord.js'
import { agent } from './agent'
import { getIdentity } from './profile'
import { createReactionCredential } from './reaction'

const client = new Discord.Client({ 
  partials: ['MESSAGE', 'REACTION'] 
})

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch()
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error)
			return
		}
  }

  const reactionAuthor = await getIdentity(user as Discord.User)
  await createReactionCredential(reaction, reactionAuthor)
})

client.once('ready', async() => {
  if (!process.env.DISCORD_BOT_DID_ALIAS) throw Error('DISCORD_BOT_DID_ALIAS is missing')

  const bot = await agent.identityManagerGetOrCreateIdentity({
    alias: process.env.DISCORD_BOT_DID_ALIAS,
    provider: 'did:web'
  })

  console.log(bot.did, 'is ready')
})


client.login(process.env.DISCORD_TOKEN)