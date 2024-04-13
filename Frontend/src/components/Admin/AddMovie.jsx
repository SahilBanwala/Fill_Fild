import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Input, Message, Select } from "../MovieMain/UserInput";
import Uploader from "../user/Uploader";
import genres from "../../utils/genres";
import LiveSearch from "../LiveSearch";

import { renderItem } from "../../utils/helper";
import { useNotification, useSearch } from "../../hooks";
import { searchActor } from "../../api/actor";
import CastForm from "../form/CastFrom";
import { MdDelete } from "react-icons/md";
import TagsInput from "../TagsInput";
import Label from "../Label";
import { validateMovie } from "../../utils/validator";
import { uploadMovie } from "../../api/movie";
import MovieUploader from "../user/MovieUploader";
import { ClipLoader } from "react-spinners";
import { ImUpload } from "react-icons/im";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  trailer: {},
  writers: [],
  duration: "",
  year: "",
  poster: null,
  genres: ["Action"],
  type: "",
  language: "",
  status: "",
};

export default function AddMovie({ admin }) {
  const [paths, setPaths] = useState([]);
  const [file, setFile] = useState([]);
  const [videoInfo, setVideoInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };
  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;

    if (name === "genres") {
      //   const array_name = [value];
      //   setMovieInfo({ ...movieInfo, [name]: array_name });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
    console.log(movieInfo);
  };

  const updateGenres = (genresInfo) => {
    const { genres } = movieInfo;
    setMovieInfo({ ...movieInfo, genres: [genresInfo ] });
  };
  const { updateNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) {
      return updateNotification("error",
        "You are Not An Admin Please Login From Admin Account to Perform Admin Operation"
      );
    } else {
    
      const { error } = validateMovie(movieInfo);
      if (error) return updateNotification("error", error);
      setLoading(true);
      // cast, tags, genres, writers
      const { tags, genres, cast, writers, trailer, director, poster } =
        movieInfo;

      const formData = new FormData();
      const finalMovieInfo = {
        ...movieInfo,
      };
      finalMovieInfo.trailer = JSON.stringify(trailer);

      finalMovieInfo.tags = JSON.stringify(tags);
      finalMovieInfo.genres = JSON.stringify(genres);

      // {
      //   actor: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
      //   roleAs: String,
      //   leadActor: Boolean,
      // },

      const finalCast = cast.map((c) => ({
        actor: c.profile.id,
        roleAs: c.roleAs,
        leadActor: c.leadActor,
      }));
      finalMovieInfo.cast = JSON.stringify(finalCast);

      if (writers.length) {
        const finalWriters = writers.map((w) => w.id);
        finalMovieInfo.writers = JSON.stringify(finalWriters);
      }

      // if (director.id) finalMovieInfo.director = director.id;
      if (poster) finalMovieInfo.poster = poster;

      for (let key in finalMovieInfo) {
        formData.append(key, finalMovieInfo[key]);
      }
      console.log(finalMovieInfo);
      const res = await uploadMovie(formData);
      setLoading(false);
      if (res.error) {
        updateNotification("error", res.error);
      }
      if (res.movie) {
        updateNotification("success", "Movie Update Successfull");
      }
    }
  };

  useEffect(() => {
    movieInfo.poster = file;
  }, [paths, file]);

  useEffect(() => {
    movieInfo.trailer = videoInfo;
  }, [videoInfo]);

  return (
    <div>
      <SideBar>
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Create Movie</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <Input
              name="title"
              label="Movie Title"
              placeholder="Game of Thrones"
              onChange={handleChange}
              bg={true}
            />
            <Input
              label="Hours"
              name="duration"
              onChange={handleChange}
              placeholder="2hrs"
              type="text"
              bg={true}
            />
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="text-sm w-full">
              <Select
                label="Language"
                name="language"
                onChange={handleChange}
                options={[
                  { title: "Select Language" },
                  { title: "English" },
                  { title: "Hindi" },

                  { title: "Other" },
                ]}
              />
            </div>
            <Input
              label="Year of Release"
              placeholder="2022"
              name="year"
              onChange={handleChange}
              type="number"
              bg={true}
            />
            <div className="w-full grid md:grid-col-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">Poster</p>
                <Uploader setPoster={setPaths} setFile={setFile} />
              </div>
            </div>

            <div className="w-full grid md:grid-col-2 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-border font-semibold text-sm">Trailer</p>
                <MovieUploader admin={admin} setVideoInfo={setVideoInfo} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Preview Poster
              </p>
              <img className="w-full" src={paths}></img>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="text-sm w-full">
              <Select
                label="Type"
                name="type"
                onChange={handleChange}
                options={[
                  { title: "Select Type" },
                  { title: "Movie" },
                  { title: "TV Series" },

                  { title: "Web Series" },
                ]}
              />
            </div>
            <div className="text-sm w-full">
              <Select
                label="Status"
                name="status"
                onChange={handleChange}
                options={[{ title: "Select Status" },{ title: "Public" }, { title: "Private" }]}
              />
            </div>
          </div>
          <div className="text-sm w-full">
            <Select
              label="Generes"
              name="genres"
              options={genres}
              onChange={(event) =>
                updateGenres(event.target.value)
              }
            />
          </div>
          <div className="text-sm w-full">
            <p className="text-border font-semibold text-sm my-3">Tags</p>
            <TagsInput
              value={movieInfo.tags}
              name="tags"
              onChange={updateTags}
            />
          </div>
          <Message
            label="Story Line"
            name="storyLine"
            onChange={handleChange}
            placeholder="Make it short and sweet"
          />
          <div className="text-sm w-full">
          <p className="text-border font-semibold text-sm my-3">Add Cast</p>
            <CastForm onSubmit={updateCast}>
              <div className="grid 2xl:grid-cols-4 lg-grid-col-3 sm:grid-cols-4 grid-cols-2 gap-4">
                {movieInfo.cast.length ?
                  movieInfo.cast.map((it, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                      >
                        <img
                          src={it.profile.avatar}
                          alt={it.profile.name}
                          className="w-full h-24 object-cover rounded mb-4"
                        ></img>
                        <p>{it.profile.name}</p>
                        <div className="flex-rows mt-2 w-full gap-2">
                          <button className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded">
                            <MdDelete
                              onClick={(event) =>
                                handleCastRemove(it.profile.id)
                              }
                            />
                          </button>
                        </div>
                        <div></div>
                      </div>
                    );
                  }):""}
              </div>
            </CastForm>
            <button
              className="bg-subMain w-full flex-rows gap-6 my-6 font-medium trasnsitions hover:bg-dry border border-subMain text-white py-4  rounded "
              onClick={handleSubmit}
            >
              {loading ? (
                <ClipLoader color="#36d7b7" />
              ) : (
                <>
                  {" "}
                  <ImUpload /> Add Movie
                </>
              )}
            </button>
          </div>
        </div>
      </SideBar>
    </div>
  );
}
