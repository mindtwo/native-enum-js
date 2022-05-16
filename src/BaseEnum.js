export class BaseEnum {

    constructor() {
    }

    /**
     * Return localization map where
     * name => localized_name
     *
     * @returns {{}|null}
     */
    get localizations() {
        return {};
    }

    /**
     * Override an return true to indicate this Enum
     * has localizeable names
     *
     * @returns {boolean}
     */
    get isLocalized() {
        return this.localizations && Object.keys(this.localizations).length > 0
    }

    /**
     * Translate a name
     *
     * @param name
     * @returns {*}
     */
    static translate(name) {
        const instance = new this.prototype.constructor();
        if (!instance.isLocalized) {
            return name;
        }
        return instance.localizations[name] ?? name;
    }

    /**
     * Check if passed name corresponds to a case
     *
     * @param name
     * @returns {boolean}
     */
    static isCase(name) {
        return /[A-Z]/.test(name.charAt(0));
    }

    /**
     * Get array of enum keys
     *
     * @returns {string[]}
     */
    static names() {
        return this.cases().map(([name, value]) => name);
    }

    /**
     * Get array of enum values
     *
     * @returns {any[]}
     */
    static values() {
        return this.cases().map(([name, value]) => value);
    }

    /**
     * Get this enums cases
     *
     * @returns {[string, any][]}
     */
    static cases() {
        return Object.entries(this).filter(([name, value]) => this.isCase(name));
    }

    /**
     * Get case by their value
     * Returns undefined if no case is found
     *
     * @param value
     * @returns {*}
     */
    static byValue(value) {
        return this.cases().find(([name, val]) => value === val);
    }
}
