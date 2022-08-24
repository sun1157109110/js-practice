function App() {
  const [count, setCount] = useState(0)

  const sayCount = useEvent(() => {
    console.log(count)
  })

  return <Child onClick={sayCount} />
}

function App() {
  const [count, setCount] = useState(0)
  const countRef = React.useRef()
  countRef.current = count

  const sayCount = useCallback(() => {
    console.log(countRef.current)
  }, [])

  return <Child onClick={sayCount} />
}
function useEvent(handler) {
  const handlerRef = useRef(null);

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}

