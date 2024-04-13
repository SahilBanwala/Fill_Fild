import React, { useEffect, useState } from "react";
import Titles from "../user/Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "./UserInput";
import { deleteReview, getSingleReview, postReview, updateMovie, updateReview } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import Stars from "../Stars";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function MovieReview({ id }) {
  const Ratings = [
    {
      title: "0 -Poor",
      value: 0,
    },
    {
      title: "1 -Fair",
      value: 1,
    },
    {
      title: "2 -Good",
      value: 2,
    },
    {
      title: "3 -Very Good",
      value: 3,
    },
    {
      title: "4 -Excellent",
      value: 4,
    },
    {
      title: "5 -Materpiece",
      value: 5,
    },
  ];

  const { authInfo } = useAuth();
  const user = {
    id: authInfo.profile?.id,
  };
  const { updateNotification } = useNotification();

  const [rating, setRating] = useState();
  const [review, setReview] = useState([]);
  const [content, setContent] = useState();
  const [toogle, setToogle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userr, setUserr] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async () => {
    if(userr){
      setLoading(true);
      const { error, message } = await updateReview(userr, {
        rating: rating,
        content: content,
      }); 
      setLoading(false);
      if (error) return updateNotification("error", error);
  
      updateNotification("success", message);
      setToogle(!toogle);
    }
   else if (authInfo.isLoggedIn && !userr) {
      setLoading(true);
      const { error, reviews } = await postReview(id, {
        rating: rating,
        content: content,
      });
      setLoading(false);
      if (error) return updateNotification("error", error);
      updateMovie("success", "Review Added Successfull");
      setToogle(!toogle);
    } 
    else {
      navigate("/auth/signin");
      updateNotification("error", "Please Login To Post Review");
    }
  };

  const handleDeleteConfirm = async (id) => {
    const { error, message } = await deleteReview(id); 
    if (error) return updateNotification("error", error);

     setToogle(!toogle)
     updateNotification("success","Review Deleted Successfully")
  };

  const fetchReview = async () => {
    if (id) {
      const { error, reviews } = await getSingleReview(id);
      console.log("sdsd", review);
      if (error) return updateNotification("error", error);
      setReview(reviews)
    }
  };

  const findProfileOwnersReview = () => {
    const matched = review.find((review) => review.owner.id === authInfo.profile?.id);
    if (!matched)
      return setUserr(false);

      setContent(matched.content)
      setRating(matched.rating)
       setUserr(matched.id)
  };

  useEffect(() => {
    fetchReview();
  }, [id, toogle]);

  useEffect(() => {
    findProfileOwnersReview();
  }, [review]);

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* Write Review */}
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl text-text font-semibold">Write A Review</h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie .It will be posted on this page.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Ratings"
              options={Ratings}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Stars value={rating} />
            </div>
          </div>
          <Message
            label="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Make it short and sweet...."
          />
          <button
            onClick={handelSubmit}
            className="bg-subMain text-white py-3 w-full flex-colo rounded"
          >
            {loading ? <ClipLoader color="#36d7b7" /> : userr? "Update Review": "Post Review"}
          </button>
        </div>
        {/* Reviews */}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews {review ? review.length : 0}
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {review &&
              review.map((it, index) => {
                return (
                  <>
                  <div className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                    <div className="col-span-2 bg-main hidden md:block">
                      <img
                        src="/user.jpg"
                        className="w-full h-24 rounded-lg object-cover"
                      />
                    </div>

                    <div className="col-span-7  text-white flex flex-col  gap-2">
                      <div className="flex">
                      <h2>{it.owner.name}</h2>
                   {it.owner.id === authInfo.profile?.id ?<> <button onClick={(e)=>handleDeleteConfirm(it.id)} className="bg-subMain text-white rounded flex-colo w-7 h-6 mx-2 ">
                      <MdDelete />
                    </button>
                    </>:""}
                    </div>
                      <p className="text-xs leading-6 font-medium text-text">
                        {it.content}
                      </p>
                    </div>
                    
                    {/* Rates */}
                    <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                      <Stars value={it.rating} />
                    </div>
                    
                  </div>
                   </>
                );
               
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
