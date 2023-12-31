import { useEffect, useState } from "react";
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handlder = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handlder);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
