import React from "react";

export default function NumberProgress({ current, total }) {
  console.log(current);

  const currentProgress = [];
  const finishedProgress = [];
  const unFinished = [];

  for (let i = 0; i < total; i++) {
    if (i + 1 === current) {
      currentProgress.push(i + 1);
    }
    if (i + 1 < current) {
      finishedProgress.push(i + 1);
    }
    if (i + 1 > current) {
      unFinished.push(i + 1);
    }
  }

  // function styling() {
  //   const target = document.querySelector("#current");
  //   target.classList.add("mx-1");
  // }
  // styling();
  return (
    <>
      <div className="d-flex line justify-content-center align-items-center ">
        {finishedProgress.length > 0 ? (
          finishedProgress.map((i) => {
            return (
              <div
                id="current"
                className={
                  total <= 4
                    ? "rounded-circle mx-3 mx-sm-5 circleNumber"
                    : "rounded-circle mx-1 mx-sm-3 circleNumber"
                }
              >
                <h1 className="  number">{i}</h1>
              </div>
            );
          })
        ) : (
          <></>
        )}
        {currentProgress.length > 0 ? (
          currentProgress.map((i) => {
            return (
              <div
                id="current"
                className={
                  total <= 4
                    ? "rounded-circle d-flex mx-3 mx-sm-5 borderCircle"
                    : "rounded-circle d-flex mx-1 mx-sm-3 borderCircle"
                }
              >
                <div className="rounded-circle m-auto circleNumber">
                  <h1 className=" h-100  number">{i}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
        {unFinished.length > 0 ? (
          unFinished.map((i) => {
            return (
              <div
                id="current"
                className={
                  total <= 4
                    ? "rounded-circle mx-3 mx-sm-5 circleNumber"
                    : "rounded-circle mx-1 mx-sm-3 circleNumber"
                }
                style={{
                  backgroundColor: "#C4C4C4",
                }}
              >
                <h1 className=" number">{i}</h1>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
