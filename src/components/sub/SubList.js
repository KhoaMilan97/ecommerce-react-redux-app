import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getSubs } from "../../functions/sub";

function SubList() {
  const [subs, setSub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCanceled = false;
    getSubs()
      .then((res) => {
        if (!isCanceled) {
          setSub(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    return () => {
      isCanceled = true;
    };
  }, []);

  const showSub = () =>
    subs.map((s) => (
      <button
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-raised btn-block m-3"
      >
        <Link
          to={`/sub/${s.slug}`}
          className="text-center"
          style={{ width: "100%", display: "block" }}
        >
          {s.name}
        </Link>
      </button>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">loading...</h4> : showSub()}
      </div>
    </div>
  );
}

export default SubList;
