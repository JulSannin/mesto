export default class UserInfo {
    constructor(profileName, profileDescription, profileAvatar) {
        this._nameElement = profileName;
        this._descriptionElement = profileDescription;
        this._profileAvatar = profileAvatar;
    };

    saveUserId(userId) {
        this._userId = userId
    };

    getUserId() {
        return this._userId;
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent
        }
    };

    setUserInfo({ name, description }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
    };

    setUserAvatar({ avatarLink }) {
        this._profileAvatar.src = avatarLink;
    };
};