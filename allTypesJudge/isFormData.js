exports.isFormData = function isFormData(v) {
    return typeof FormData !== 'undefined' && v instanceof FormData;
}