import { useEffect, useState } from "react";

export default function Auth({ children }: { children: React.ReactNode }) {
  const [isSignedIn] = useAuth(false);
  return <div>{isSignedIn ? children : "login page"}</div>;
}

const useAuth = (initialState: boolean) => {
  const [isSignedIn, setIsSignedIn] = useState(initialState);
  // useEffect(() => {
  //   const isSignedIn = localStorage.getItem("isSignedIn");
  //   if (isSignedIn) {
  //     setIsSignedIn(true);
  //   }
  // }, []);
  return [isSignedIn, setIsSignedIn];
};
