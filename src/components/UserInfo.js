export default class UserInfo {
    constructor(profileName, profileDescription) {
        this._nameElement = profileName;
        this._descriptionElement = profileDescription;
    };

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
};