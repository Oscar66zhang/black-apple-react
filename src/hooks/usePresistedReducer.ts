import { Reducer, Dispatch, useReducer, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useImmerReducer, ImmerReducer } from "use-immer";

const usePresistedReducer = <S, A>(
    reducer: ImmerReducer<S, A>, key: string, initialState: S): [S, Dispatch<A>] => {
    // 1.先从localStorage读状态
    const [presistedState, setPersistedState] =
        useLocalStorage<S>(key, initialState);

    // 2. 把reducer和持久化状态结合
    const [state, dispatch] = useImmerReducer(reducer, presistedState);

    // 3.状态变化时，自动同步到localStorage
    useEffect(() => { }, [state, setPersistedState]);

    return [state, dispatch] as const;
}

export default usePresistedReducer