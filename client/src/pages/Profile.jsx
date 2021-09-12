import React, { useState, useEffect } from "react";
import { getUsers } from "../class/helper";
import Layout from "../components/Layout/Layout";
import ProfileLayout from "../components/Profile";

export default function Profile() {
  const [result, setResult] = useState({});

  useEffect(async () => {
    setResult(await getUsers());
  }, []);

  return (
    <Layout>
      <div style={{ width: "50%", margin: "auto" }}>
        {Object.keys(result).length > 0 && <ProfileLayout {...result} />}
      </div>
    </Layout>
  );
}
