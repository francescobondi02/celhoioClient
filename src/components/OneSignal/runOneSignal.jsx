import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: '66815ff4-0ef9-4843-b0cb-9673bb0d323e', allowLocalhostAsSecureOrigin: true});
  OneSignal.showSlidedownPrompt();
}