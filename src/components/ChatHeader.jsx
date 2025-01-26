import { X } from "lucide-react";
// import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";
import {useSocket} from "./useSocket";

const backendBaseUrl = "http://localhost:7000";
// const vercelurl="https://socialmedia-backend-2njs.onrender.com";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useSocket();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-8  relative">
              {/* <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} /> */}
              <img className="rounded-md" src={selectedUser.profilePic === '/images/default_profile.jpeg' ? '/images/default_profile.jpeg' : `${selectedUser.profilePic}`} alt={selectedUser.fullName} />

            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-black-900">{selectedUser.username || selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>

  )
};

export default ChatHeader;