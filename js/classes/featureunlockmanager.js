//control when which features, upgrade types etc. are available to make updates with new features seamless
class FeatureUnlockManager
{
    static getFeatures(layer)
    {
        if(layer === 0)
        {
            return [FEATURE_GENERATORS, FEATURE_RESOURCEBUTTON, FEATURE_UPGRADES];
        }
        if(layer === 1)
        {
            return [FEATURE_SIMPLEBOOST, FEATURE_UPGRADES, FEATURE_POWER];
        }
        if(layer === 2)
        {
            return [FEATURE_SIMPLEBOOST, FEATURE_UPGRADES, FEATURE_POWER, FEATURE_CHALLENGES];
        }
        if(layer >= 3)
        {
            return [FEATURE_SIMPLEBOOST, FEATURE_UPGRADES, FEATURE_POWER, FEATURE_CHALLENGES, FEATURE_UPGRADE_TREE];
        }
    }

    static getUpgradeTypes(layer)
    {
        var upgTypes = [UPGRADE_RESOURCE, UPGRADE_GENERATOR];
        if(layer >= 1 && layer < 8)
        {
            upgTypes.push(UPGRADE_GENMULTI);
        }
        if(layer >= 2)
        {
            upgTypes.push(UPGRADE_PRESTIGEREWARD);
        }
        if(layer >= 4)
        {
            upgTypes.push(UPGRADE_POWERGENERATOR);
        }
        return upgTypes;
    }

    static getChallengeEffectTypes(layer)
    {
        return [CHALLENGE_EFFECT_PRICES_POWER, CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST, CHALLENGE_EFFECT_GENMULTI, CHALLENGE_EFFECT_PRESTIGEREWARD];
    }

    static getChallengeRewardTypes(layer)
    {
        var rewardTypes = [CHALLENGE_REWARD_POWERGENERATORS, CHALLENGE_REWARD_PRESTIGEREWARD];
        if(layer >= 4) {
            rewardTypes.push(CHALLENGE_REWARD_GENMULTI_ABS)
        } else {
            rewardTypes.push(CHALLENGE_REWARD_GENMULTI)
        }
        if(layer >= 9) {
            rewardTypes.push(CHALLENGE_REWARD_RESTACK)
        }
        return rewardTypes
    }

    static getUpgradeTreeTypes(layer)
    {
        return [UPGRADE_RESOURCE_TIMELAYER, UPGRADE_GENERATOR_TIMELAYER, UPGRADE_POWERGENERATOR_TIMELAYER];
    }
}