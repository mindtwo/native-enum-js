import {ServedEnum} from './ServedEnum';

export class Enums {

    /**
     * Get served enum by name
     *
     * @param name
     * @returns {ServedEnum}
     */
    static servedEnum(name) {
        if (window.m2_ServedEnums && window.m2_ServedEnums[name]) {
            return ServedEnum.enum(window.m2_ServedEnums[name]);
        }

        return null;
    }
}