import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";

interface UserContextProps {
  userAddress: string | null;
  accountId: string | null;
  isRequestPending: boolean;
  isConnected: boolean;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setAccountId: React.Dispatch<React.SetStateAction<string | null>>;
  fetchAccounts: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const STORAGE_KEY = "activeStep";

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [activeStep, setActiveStep] = useState(() => {
    const storedStep = localStorage.getItem(STORAGE_KEY);
    return storedStep ? parseInt(storedStep, 10) : 1;
  });

  // Fonction pour récupérer les comptes
  const fetchAccounts = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw Error(
          "Please install MetaMask plugin first, visit https://metamask.io/download"
        );
      }

      setIsRequestPending(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccountId(accounts[0]);
      localStorage.setItem("accountId", accounts[0]);

      setIsRequestPending(false);
      setActiveStep(2);
    } catch (e) {
      setIsRequestPending(false);
      console.error(`Error: ${(e as Error)?.message}`);
    }
  }, []);

  const isConnected = !!accountId;

  useEffect(() => {
    if (!isConnected) {
      fetchAccounts();
    }
  }, [isConnected, fetchAccounts]);
  return (
    <UserContext.Provider
      value={{
        userAddress,
        setUserAddress,
        accountId,
        setAccountId,
        isRequestPending,
        fetchAccounts,
        isConnected,
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
