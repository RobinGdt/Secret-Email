import {
  DataSchema,
  IExecDataProtector,
  ProtectedDataWithSecretProps,
} from "@iexec/dataprotector";
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
  accountId?: string;
  isRequestPending: boolean;
  isProtectRequestPending: boolean;
  isConnected: boolean;
  activeStep: number;
  error: string;
  address: string;
  isGrantingAccess: boolean;
  protectedEmails: {
    name?: string;
    address: string;
    schema: { email: string };
  }[];
  selectedEmail: string;
  setSelectedEmail: React.Dispatch<React.SetStateAction<string>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setAccountId: React.Dispatch<React.SetStateAction<string | undefined>>;
  fetchAccounts: () => Promise<void>;
  protectedDataSubmit: (email: string, name: string) => Promise<void>;
  logOut: () => Promise<void>;
  grantAccess: (userAdress: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const STORAGE_KEY = "activeStep";

const dataProtector = new IExecDataProtector(window.ethereum);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [isProtectRequestPending, setIsProtectRequestPending] = useState(false);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [error, setError] = useState("");
  const [isGrantingAccess, setIsGrantingAccess] = useState(false);
  const [protectedEmails, setProtectedEmails] = useState<
    { name?: string; address: string; schema: { email: string } }[]
  >([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [activeStep, setActiveStep] = useState(() => {
    const storedStep = localStorage.getItem(STORAGE_KEY);
    return storedStep ? parseInt(storedStep, 3) : 1;
  });

  // GRANT ACCES
  const grantAccess = async (userAddress: string) => {
    setIsGrantingAccess(true);
    try {
      await dataProtector.grantAccess({
        protectedData: accountId as string,
        authorizedUser: userAddress as string,
        authorizedApp: "web3mail.apps.iexec.eth",
        numberOfAccess: 1,
      });
      console.log("Access shared");
    } catch (error) {
      console.log(error);
    } finally {
      setIsGrantingAccess(false);
    }
  };

  useEffect(() => {
    const fetchProtectedEmails = async () => {
      try {
        const result = await dataProtector.fetchProtectedData({
          owner: accountId,
        });

        const emails = result.filter(
          (data) => data.schema && data.schema.email === "string"
        );
        console.log(emails);
        setProtectedEmails(emails as never);
      } catch (error) {
        console.error("Error Fetching Protected Emails", error);
      }
    };

    fetchProtectedEmails();
  }, [accountId]);

  // FETCH ACCOUNTS
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

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x86",
            chainName: "iExec Sidechain",
            nativeCurrency: {
              name: "xRLC",
              symbol: "xRLC",
              decimals: 18,
            },
            rpcUrls: ["https://bellecour.iex.ec"],
            blockExplorerUrls: ["https://blockscout-bellecour.iex.ec"],
          },
        ],
      });

      setAccountId(accounts[0]);
      localStorage.setItem("accountId", accounts[0]);

      setIsRequestPending(false);
      setActiveStep(2);
    } catch (error) {
      setIsRequestPending(false);
      console.error(`Error: ${(error as Error)?.message}`);
    }
  }, []);

  // PROTECTED DATA SUBMIT
  const protectedDataSubmit = useCallback(
    async (email: string, name: string) => {
      const data: DataSchema = { email: email } as DataSchema;
      try {
        setIsProtectRequestPending(true);
        const protectedDataAddress: ProtectedDataWithSecretProps =
          await dataProtector.protectData({
            data,
            name,
          });
        setIsProtectRequestPending(false);
        setActiveStep(3);
        setAddress(protectedDataAddress.address);
        console.log(address);
      } catch (error) {
        setIsProtectRequestPending(false);
        setError((error as Error).message);
      }
    },
    [address]
  );

  // LOG OUT
  const logOut = useCallback(async () => {
    try {
      localStorage.clear();
      setUserAddress(null);
      setAccountId(undefined);
      setActiveStep(1);
    } catch (e) {
      console.error(`Error logging out: ${(e as Error)?.message}`);
    }
  }, []);

  const isConnected = !!accountId;

  useEffect(() => {
    if (localStorage.getItem("accountId")) {
      fetchAccounts();
    }
  }, [fetchAccounts]);
  return (
    <UserContext.Provider
      value={{
        userAddress,
        setUserAddress,
        accountId,
        setAccountId,
        isRequestPending,
        isProtectRequestPending,
        fetchAccounts,
        isConnected,
        activeStep,
        error,
        address,
        isGrantingAccess,
        protectedEmails,
        selectedEmail,
        setSelectedEmail,
        setActiveStep,
        logOut,
        protectedDataSubmit,
        grantAccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
