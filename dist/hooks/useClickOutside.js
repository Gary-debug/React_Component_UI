import { useEffect } from "react";
function useClickOutside(ref, handlder) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handlder(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handlder]);
}
export default useClickOutside;
