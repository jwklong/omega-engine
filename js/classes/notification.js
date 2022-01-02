const NOTIFICATION_STANDARD = 0, NOTIFICATION_ERROR = 1, NOTIFICATION_SUCCESS = 2, NOTIFICATION_SPECIAL = 3;

class Notification
{
    constructor(type, message, icon = null)
    {
        this.type = type;
        this.message = message;
        this.icon = icon;
        this.lifeTime = 0;
    }

    tick(dt)
    {
        this.lifeTime += dt;
    }
}