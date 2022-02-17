import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyDate = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의일기1번",
    date: 1645080200157,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의일기2번",
    date: 1645080200158,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의일기3번",
    date: 1645080200159,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의일기4번",
    date: 1645080200160,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의일기5번",
    date: 1645080200161,
  },
];
function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE

  const onRemove = (targekId) => {
    dispatch({ type: "REMOVE", targekId });
  };
  //EDIT
  const onEdit = (targekId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targekId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
