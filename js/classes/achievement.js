class Achievement
{
    constructor(title, description, html, checkCompleted)
    {
        this.title = title;
        this.description = description;
        this.checkCompleted = checkCompleted;
        this.html = html;
        this.isCompleted = false;
    }

    tick(dt)
    {
        if(!this.isCompleted)
        {
            this.isCompleted = this.checkCompleted();
            if(this.isCompleted && game.settings.notifications)
            {
                functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "Achievement Get: " + this.title, "images/star.svg"));
            }
        }
    }
}