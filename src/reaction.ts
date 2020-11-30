import { IIdentity } from 'daf-core'
import Discord from 'discord.js'
import { agent } from './agent'
import { createMessageCredential } from './message'

export const createReactionCredential = async (reaction: Discord.MessageReaction, reactionAuthor: IIdentity) => {

  await createMessageCredential(reaction.message)

  const credentialSubject = {
    id: reaction.message.id,
    emoji: reaction.emoji.name
  }

  await agent.createVerifiableCredential({
    save: true,
    proofFormat: 'jwt',
    credential: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'Mercury', 'Reaction'],
      issuer: { id: reactionAuthor.did },
      issuanceDate: new Date().toISOString(),
      credentialSubject
    }
  })


}