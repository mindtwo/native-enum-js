import {BaseEnum} from './BaseEnum.js';

export class ServedEnum extends BaseEnum {
    constructor() {
        super();
    }

    /**
     * Add case to this ServedEnum instance
     *
     * @param enumEntry
     */
    addCase(enumEntry) {
        const { name, value, localized_name } = enumEntry;

        // add case
        this[name] = this.parseValue(value);

        if (localized_name) {
            this.localizations[name] = localized_name;
        }
    }

    /**
     * Parse the enum value using JSON.parse
     *
     * @param value
     * @return {*}
     */
    parseValue(value) {
        if (typeof value === 'string') {
            return JSON.parse(value)
        }
        return value;
    }

    /**
     * Create a ServedEnum using either string, object or array
     *
     * @param from
     * @returns {null|*}
     */
    static enum(from) {
        if (typeof from === 'string') {
            return this.fromString(from);
        }

        if (Array.isArray(from)) {
            return this.fromArray(from);
        }

        if (typeof from === 'object') {
            return this.fromMap(from);
        }

        return null;
    }

    /**
     * Create instance from map holding enum entries
     *
     * @param entries
     * @returns {null}
     */
    static fromMap(entries) {
        if (!entries) {
            return null;
        }

        // create new instance and push add cases from object
        const instance = new this.prototype.constructor();
        for (const enumEntry of Object.values(entries)) {
            instance.addCase(enumEntry);
        }

        return instance;
    }

    /**
     * Create instance from array holding enum entries
     *
     * @param entries
     * @returns {null}
     */
    static fromArray(entries) {
        if (!entries) {
            return null;
        }

        const instance = new this.prototype.constructor();
        for (const enumEntry of Object.values(entries)) {
            instance.addCase(enumEntry);
        }

        return instance;
    }

    /**
     * Create instance from string
     * gets the enum from path inside
     * global window object
     *
     * @param from
     * @returns {null|*}
     */
    static fromString(from) {
        // split string in path segments
        const fromSegments = from.split('.');
        if (fromSegments.length === 0) {
            return null;
        }

        // iterate path segments
        let entries = window;
        for(const segment of fromSegments) {
            if (!entries) {
                return null;
            }
            // go one deeper
            entries = entries[segment];
        }

        // create instance from array if we have found an enum
        if (Array.isArray(entries)) {
            return this.fromArray(entries);
        }

        // create instance from object if we have found an enum
        if (typeof entries === 'object') {
            return this.fromMap(entries);
        }

        // return null if we haven't found anything
        return null;
    }

}
