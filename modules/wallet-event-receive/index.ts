import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to WalletEventReceive.web.ts
// and on native platforms to WalletEventReceive.ts
import WalletEventReceiveModule from './src/WalletEventReceiveModule';
import WalletEventReceiveView from './src/WalletEventReceiveView';
import { ChangeEventPayload, WalletEventReceiveViewProps } from './src/WalletEventReceive.types';

// Get the native constant value.
export const PI = WalletEventReceiveModule.PI;

export function hello(): string {
  return WalletEventReceiveModule.hello();
}

export async function setValueAsync(value: string) {
  return await WalletEventReceiveModule.setValueAsync(value);
}

const emitter = new EventEmitter(WalletEventReceiveModule ?? NativeModulesProxy.WalletEventReceive);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { WalletEventReceiveView, WalletEventReceiveViewProps, ChangeEventPayload };
