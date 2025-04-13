export default function useCapitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}