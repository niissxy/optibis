import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const localClient = new Proxy(async () => null, {
  get(_target, property) {
    if (property === 'then') return undefined;
    if (property === 'filter') return async () => [];
    return localClient;
  },
});

export const base44 = appId
  ? createClient({
      appId,
      token,
      functionsVersion,
      serverUrl: '',
      requiresAuth: false,
      appBaseUrl,
    })
  : localClient;
