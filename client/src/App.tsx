import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import io, { Socket } from "socket.io-client";
import { SocketContext } from "./contexts/SocketContext";
import Router from "./shared/Router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => Math.min(attempt * 1000, 30 * 1000),
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.REACT_APP_SERVER_URL}`);
    if (socketInstance) {
      let user;
      if (localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user")!);
        socketInstance.emit("join", user.userId);
        setSocket(socketInstance);
      }
    }

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <SocketContext.Provider value={socket}>
            <ToastContainer position="top-center" autoClose={3000} />
            <Router />
          </SocketContext.Provider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
