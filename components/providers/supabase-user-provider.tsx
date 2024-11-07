"use client";

import { AuthUser } from "@supabase/supabase-js";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

const initialUserState = {
  user: null,
};
const SupabaseUserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<Action>;
}>({
  state: initialUserState,
  dispatch: () => {},
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

type Action =
  | {
      type: "SIGN_IN";
      payload: {
        user: AuthUser | null;
      };
    }
  | {
      type: "SIGN_OUT";
    };
interface UserState {
  user: AuthUser | null;
}

const appReducer = (
  state: UserState = initialUserState,
  action: Action
): UserState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
      };
    default:
      return initialUserState;
  }
};
export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(appReducer, initialUserState);

  const supabase = createClientComponentClient();

  //Fetch the user details
  //subscription
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      dispatch({
        type: "SIGN_IN",
        payload: { user },
      });
      return user;
    } else {
      dispatch({
        type: "SIGN_OUT",
      });
      return null;
    }
  };

  useEffect(() => {
    console.log("User State Changed", state);
  }, [state]);

  useEffect(() => {
    getUser();
  }, [supabase, toast]);

  return (
    <SupabaseUserContext.Provider value={{ state, dispatch }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
