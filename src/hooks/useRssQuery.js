export const useRssQuery = () => {
    const [query, setQuery] = useState("");

    return {query, setQuery};
}