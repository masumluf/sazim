import React, { useState, useContext } from "react";
import { store } from "../../class/Store";
import { TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useCart from "../../class/Context";
import TestInput from "./TestInput";
import { updateStudentMark } from "../../class/helper";

export default function Table() {
  const {
    state: { marks },
  } = useContext(store);

  const [grade, setGrade] = useState(null);
  const [hide, setHide] = useState(false);

  const { updateMark } = useCart();

  const handleChange = (e) => {
    e.preventDefault();
    setGrade(e.target.value);
  };

  const handleHide = (e) => {
    e.preventDefault();
    setHide(!hide);
  };

  const handleGrade = async (id, index) => {
    updateMark(index, grade);
    await updateStudentMark(id, grade);
  };

  return (
    <div>
      {/* {Object.keys(marks).length > 0 &&
        marks.map((p) => <h1>{p?.user?.first_name}</h1>)} */}

      <table style={{ width: "100%", border: "1px solid black" }}>
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black" }}>Name</th>
          <th style={{ border: "1px solid black" }}>Grade</th>
        </tr>

        {Object.keys(marks).length > 0 &&
          marks.map((p, i) => (
            <tr key={i}>
              <td
                style={{ border: "1px solid black", padding: "10px" }}
                align='center'>
                {p?.user?.first_name}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  width: "300px",
                }}
                align='center'>
                {p?.mark === null ? (
                  <div style={{ display: "inline" }}>
                    <TestInput
                      value={grade}
                      handleChange={handleChange}
                      placeholder='Enter Grade'
                      style={{ marginTop: "0px" }}
                    />

                    <CheckCircleIcon
                      fontSize='small'
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        handleGrade(p?.id, i);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    {!hide && p?.mark}
                    {hide && (
                      <>
                        <TestInput
                          value={p?.mark}
                          handleChange={handleChange}
                          placeholder='Enter Grade'
                          style={{ marginTop: "0px" }}
                        />
                        <CheckCircleIcon
                          fontSize='small'
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={(e) => {
                            handleGrade(p?.id, i);
                            handleHide(e);
                          }}
                        />
                      </>
                    )}
                    {!hide && (
                      <>
                        <CreateIcon
                          fontSize='small'
                          onClick={handleHide}
                          style={{ color: "green", cursor: "pointer" }}
                        />
                        <CancelIcon
                          fontSize='small'
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={(e) => {
                            handleGrade(p?.id, i);
                            handleHide(e);
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
