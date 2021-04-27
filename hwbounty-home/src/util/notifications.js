class Notifications {
	constructor() {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}
	static pushNotification(icon, img, title, text) {
		try {
			if (Notification.permission !== "granted") {
				Notification.requestPermission();
			}
			return new Notification(title || "HWBounty Notification", {body: text || "", icon: icon, image: img});
		} catch (error) {
			
		}
		
	}
}
export default Notifications;