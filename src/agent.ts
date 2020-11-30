import { createAgent, IIdentityManager } from 'daf-core'
import { AgentRestClient } from 'daf-rest'
import { ICredentialIssuer } from 'daf-w3c'
import { IDataStoreORM } from 'daf-typeorm'

if (!process.env.AGENT_URL) throw Error('AGENT_URL is missing')
if (!process.env.AGENT_API_KEY) throw Error('AGENT_API_KEY is missing')

export const agent = createAgent<IIdentityManager & ICredentialIssuer & IDataStoreORM>({
  plugins: [
    new AgentRestClient({
      url: process.env.AGENT_URL,
      headers: {
        Authorization: 'Bearer ' + process.env.AGENT_API_KEY
      },
      enabledMethods: [
        // 'keyManagerGetKeyManagementSystems',
        // 'keyManagerCreateKey',
        // 'keyManagerGetKey',
        // 'keyManagerDeleteKey',
        // 'keyManagerImportKey',
        // 'keyManagerEncryptJWE',
        // 'keyManagerDecryptJWE',
        // 'keyManagerSignJWT',
        // 'keyManagerSignEthTX',
        'identityManagerGetProviders',
        'identityManagerGetIdentities',
        'identityManagerGetIdentity',
        'identityManagerCreateIdentity',
        'identityManagerGetOrCreateIdentity',
        'identityManagerImportIdentity',
        'identityManagerDeleteIdentity',
        'identityManagerAddKey',
        'identityManagerRemoveKey',
        'identityManagerAddService',
        'identityManagerRemoveService',
        // 'resolveDid',
        // 'dataStoreSaveMessage',
        // 'dataStoreSaveVerifiableCredential',
        // 'dataStoreSaveVerifiablePresentation',
        'dataStoreORMGetIdentities',
        'dataStoreORMGetIdentitiesCount',
        'dataStoreORMGetMessages',
        'dataStoreORMGetMessagesCount',
        'dataStoreORMGetVerifiableCredentialsByClaims',
        'dataStoreORMGetVerifiableCredentialsByClaimsCount',
        'dataStoreORMGetVerifiableCredentials',
        'dataStoreORMGetVerifiableCredentialsCount',
        'dataStoreORMGetVerifiablePresentations',
        'dataStoreORMGetVerifiablePresentationsCount',
        // 'handleMessage',
        // 'sendMessageDIDCommAlpha1',
        'createVerifiablePresentation',
        'createVerifiableCredential',
        // 'createSelectiveDisclosureRequest',
        // 'getVerifiableCredentialsForSdr',
        // 'validatePresentationAgainstSdr',
      ]
    })
  ]
})