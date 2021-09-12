//UserCart

import { useContext } from "react";
import { store } from "./Store";

const useCart = () => {
  const {
    dispatch,
    state: { marks },
  } = useContext(store);

  const setMarks = (items) => {
    dispatch({ type: "SET_MARK", payload: items });
  };

  const addMark = (id, number) => {
    //let item = marks.findIndex((pro) => pro?.user?.id === id);
    marks[id].amount = number;

    setMarks(marks);
  };

  const initializedMark = (arr) => {
    setMarks(arr);
  };

  const deleteMark = (id) => {
    let arr = marks.filter((b) => b?.user?.id !== id);
    setMarks(arr);
  };

  const updateMark = (id, number) => {
    //let item = marks.findIndex((pro) => pro?.user?.id === id);

    marks[id].mark = number;

    setMarks(marks);
  };

  return {
    setMarks,
    addMark,
    updateMark,
    deleteMark,
    initializedMark,
  };
};

export default useCart;
