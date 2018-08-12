


export function propertiesMatcherUtil(originalModel: Object, modifierModel: Object): Object {
    for (const key in modifierModel) {
        if (modifierModel.hasOwnProperty(key)) {
            const element = modifierModel[key];

            let subKeys = Object.keys(element)
            if (subKeys.length >= 1) {
                if (typeof element !== 'string') {
                    subKeys.forEach((subKey) => {
                        if (!originalModel[key]) { return }
                        originalModel[key][subKey] = element[subKey]
                    });
                }
            } else {
                originalModel[key] = element;
            }
        }
    }

    return originalModel;

}