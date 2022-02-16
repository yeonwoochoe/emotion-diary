import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id :", id);

  const mode = searchParams.get("mode");
  console.log("mode :", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>여기는 일기 수정페이지다</p>
      <button onClick={() => setSearchParams({ who: "yeonwoo" })}>
        QS바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        home로가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
