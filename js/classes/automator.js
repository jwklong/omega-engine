class Automator
{
    constructor(name, description, action, upgrade)
    {
        this.name = name;
        this.description = description;
        this.action = action;
        this.upgrade = upgrade;
        this.active = false;

        this.cooldown = 0;
        this.desiredInterval = 0;
    }

    tick(dt)
    {
        if(this.upgrade.level.gt(0))
        {
            this.cooldown += dt;
        }
        if(this.cooldown > Math.max(this.upgrade.apply(), this.desiredInterval))
        {
            if(this.active)
            {
                this.action();
            }
            this.cooldown = 0;
        }
    }

    loadFromSave(obj)
    {
        this.upgrade.level = obj.upgrade.level;
        this.active = obj.active;
        this.desiredInterval = obj.desiredInterval;
    }
}