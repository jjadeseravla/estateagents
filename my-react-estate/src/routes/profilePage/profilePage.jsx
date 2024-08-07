// import Chat from "../../components/chat/Chat.jsx";
// import List from "../../components/list/List.jsx";
// import apiRequest from "../../lib/apiReq";
// import "./profilePage.scss";
// import { Await, useLoaderData, useNavigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthContext } from '../../context/AuthContext.jsx';
// import { Link } from 'react-router-dom';
// import { Suspense } from "react";

// function ProfilePage() {

//   const data = useLoaderData();

//   const navigate = useNavigate();

//   const { updateUser, currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login');
//     }
//   }, [navigate, currentUser])

// const handleLogout = async() => {
//   try {
//      await apiRequest.post('/auth/logout');
//     // localStorage.removeItem('user');
//     // instead of updating localstorage HERE to remove it, do below 
//     //and updateuser to null from local storage IN from authcontext
//     updateUser(null);
//     navigate('/');
//   } catch (e) {
//     console.log(e);
//   }
// }
  
//   console.log('dataaaaaaaaa', data.chatResponse);
  
//   return (
//   <>
//     { currentUser && (
//     <div className="profilePage">
//       <div className="details">
//         <div className="wrapper">
//           <div className="title">
//                 <h1>User Information</h1>
//                 <Link to="/profile/update">
//             <button>Update Profile</button>
//                 </Link>
//           </div>
//           <div className="info">
//             <span>
//               Avatar:
//               <img
//                 src={currentUser.avatar || "noavatar.jpg"}
//                 alt=""
//               />
//             </span>
//             <span>
//               Username: <b>{currentUser.username}</b>
//             </span>
//             <span>
//               E-mail: <b>{currentUser.email}</b>
//             </span>
//             <button onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//           <div className="title">
//                 <h1>My List</h1>
//               <Link to="/add">
//             <button>Create New Post</button>
//                 </Link>
//               </div>
//               <Suspense fallback={<p>Loading...</p>}>
//                 <Await
//                   resolve={data.postResponse}
//                   errorElement={<p>Error loading posts</p>}
//                 >
//                   {(postResponse) => <List posts={postResponse.data.userPosts} />}
//               </Await>
//             </Suspense>
//           <List />
//           <div className="title">
//             <h1>Saved List</h1>
//               </div>
//               <Suspense fallback={<p>Loading...</p>}>
//                 <Await
//                   resolve={data.postResponse}
//                   errorElement={<p>Error loading posts</p>}
//                 >
//                   {(postResponse) => <List posts={postResponse.data.savedPosts} />}
//               </Await>
//             </Suspense>
//           <List />
//         </div>
//       </div>
//       <div className="chatContainer">
//             <div className="wrapper">
//               <Suspense fallback={<p>Loading...</p>}>
//                 <Await
//                   resolve={data.chatResponse}
//                   errorElement={<p>Error loading chats</p>}
//                 >
//                   {(chatResponse) => <Chat chats={chatResponse.data}/>}
//                 </Await>
//               </Suspense>
//         </div>
//       </div>
//     </div>
//     )}
//   </>
//     )
// }

// export default ProfilePage;
import Chat from "../../components/chat/Chat.jsx";
import List from "../../components/list/List.jsx";
import apiRequest from "../../lib/apiReq";
import "./profilePage.scss";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Suspense } from "react";

function ProfilePage() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  // State to store the resolved chat data
  const [resolvedChatResponse, setResolvedChatResponse] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (data.chatResponse) {
      // Resolve the chatResponse promise and log the data
      data.chatResponse.then(resolvedChatData => {
        console.log('Resolved chatResponse:', resolvedChatData);
        setResolvedChatResponse(resolvedChatData);
      }).catch(error => {
        console.log('Error resolving chatResponse:', error);
      });
    }
  }, [data.chatResponse]);

  const handleLogout = async() => {
    try {
       await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {currentUser && (
        <div className="profilePage">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1>User Information</h1>
                <Link to="/profile/update">
                  <button>Update Profile</button>
                </Link>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img
                    src={currentUser.avatar || "noavatar.jpg"}
                    alt=""
                  />
                </span>
                <span>
                  Username: <b>{currentUser.username}</b>
                </span>
                <span>
                  E-mail: <b>{currentUser.email}</b>
                </span>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="title">
                <h1>My List</h1>
                <Link to="/add">
                  <button>Create New Post</button>
                </Link>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts</p>}
                >
                  {(postResponse) => <List posts={postResponse.data.userPosts} />}
                </Await>
              </Suspense>
              <List />
              <div className="title">
                <h1>Saved List</h1>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts</p>}
                >
                  {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                </Await>
              </Suspense>
              <List />
            </div>
          </div>
          <div className="chatContainer">
            <div className="wrapper">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.chatResponse}
                  errorElement={<p>Error loading chats</p>}
                >
                  {(chatResponse) => <Chat chats={chatResponse.data} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
