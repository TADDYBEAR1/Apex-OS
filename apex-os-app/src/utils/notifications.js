/**
 * Morning check-in reminder via Capacitor Local Notifications.
 * Gracefully no-ops on web or when the plugin isn't installed yet
 * (requires `npm install` after @capacitor/local-notifications was added).
 */
const REMINDER_ID = 4731;

async function getPlugin() {
  try {
    const mod = await import('@capacitor/local-notifications');
    return mod.LocalNotifications;
  } catch {
    return null;
  }
}

export async function syncMorningReminder({ enabled, hour = 6, minute = 30 } = {}) {
  const LocalNotifications = await getPlugin();
  if (!LocalNotifications) return { ok: false, reason: 'plugin-unavailable' };

  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });

    if (!enabled) return { ok: true, scheduled: false };

    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') return { ok: false, reason: 'permission-denied' };

    await LocalNotifications.schedule({
      notifications: [{
        id: REMINDER_ID,
        title: 'Apex OS — Morning Check-In',
        body: '20 seconds: sleep, knee, back, energy. Set the traffic light for today.',
        schedule: { on: { hour, minute }, allowWhileIdle: true },
        smallIcon: 'ic_stat_icon_config_sample',
      }],
    });
    return { ok: true, scheduled: true };
  } catch (error) {
    console.warn('Reminder scheduling failed', error);
    return { ok: false, reason: 'error' };
  }
}
