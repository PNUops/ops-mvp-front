import { useCallback, useEffect } from 'react';
import { useUserStore } from 'stores/useUserStore';
import { useTokenStore } from 'stores/useTokenStore';
import { getUserFromToken } from 'utils/token';

const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);
  const clearToken = useTokenStore((state) => state.clearToken);
  const initToken = useTokenStore((state) => state.initToken);

  const isSignedIn = !!user && !!token;

  const signOut = useCallback(() => {
    clearToken();
    setUser(null);
  }, [clearToken, setUser]);

  const signIn = useCallback(
    (accessToken: string) => {
      setToken(accessToken);
    },
    [setToken],
  );

  useEffect(() => {
    // TODO: 성능이 문제된다면 추후 App root로 분리하기
    initToken();
  }, [initToken]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const decoded = getUserFromToken(token);
    if (decoded) {
      setUser(decoded);
    } else {
      clearToken();
      setUser(null);
    }
  }, [token, setUser, clearToken]);

  return {
    user,
    isSignedIn,
    signIn,
    signOut,
  };
};

export default useAuth;
