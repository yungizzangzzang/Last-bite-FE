import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { toast, ToastContainer } from "react-toastify";
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
  const contextSocket = useContext(SocketContext);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!contextSocket) {
      let reconnectionAttempts = 0;
      const maxReconnectionAttempts = 5;

      const socketOptions = {
        reconnectionAttempts: maxReconnectionAttempts,
      };

      const socketInstance = io(
        `${process.env.REACT_APP_SERVER_URL}`,
        socketOptions
      );

      socketInstance.on("connect_error", () => {
        reconnectionAttempts++;
        if (reconnectionAttempts >= maxReconnectionAttempts) {
          console.log("소켓 연결 실패, 더 이상 연결을 시도하지 않습니다.");
          socketInstance.close();
        }
      });

      socketInstance.on("reconnect_failed", () => {
        console.log("소켓 연결 실패");
      });

      socketInstance.on("connect", () => {
        console.log("소켓 연결 성공");

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log(latitude, longitude);
              socketInstance.emit("send_location", { latitude, longitude });
            },
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  console.log("위치 정보 제공 동의를 거절하였습니다.");
                  toast.error(
                    "위치 정보 제공 동의를 거절하였습니다. 제한된 기능만 사용 가능합니다."
                  );
                  break;
              }
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      });

      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user")!);
        socketInstance.emit("join", user.userId);
        setSocket(socketInstance);
      }

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [contextSocket]);

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
