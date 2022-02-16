import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Diary</h1>
      <p>여기는 일기 상세 페이지다</p>
    </div>
  );
};

export default Diary;
