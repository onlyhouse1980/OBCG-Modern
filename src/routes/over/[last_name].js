'use client';
// pages/users/[last_name].js
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from "../over/[last_name].module.css";
import * as React from "react";
import BGBlack from "@/components/BGBlack";
var bgColors = {
  Default: "#81b71a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42",
};

const User = () => {
  const params = useParams();
  const last_name = params?.last_name;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (last_name) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/users/${last_name}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('An error occurred while fetching the user.');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [last_name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  function galOverAugust() {
    if (user.oct07_20 - user.aug10_20 > 6000) {
      return;

      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="utilized"
        id="augOver1"
        value={user.oct07_20 - user.aug10_20 - 6000}
        label="galOver1"
        readOnly
      ></input>;
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="augOver2"
          value="0"
          label="galOver2"
          readOnly
        ></input>
      );
    }
  }

  function galOverAugustFees() {
    let x = user.oct07_20 - user.aug10_20;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTAugust2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverOctober() {
    if (user.dec10_20 - user.oct07_20 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="octOver"
          value={user.dec10_20 - user.oct07_20 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="octOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverOctoberFees() {
    let x = user.dec10_20 - user.oct07_20;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober2020"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober2020t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober2020t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTOctober2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverDecember() {
    if (user.feb19_21 - user.dec10_20 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="decOver"
          value={user.feb19_21 - user.dec10_20 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="decOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverDecemberFees() {
    let x = user.feb19_21 - user.dec10_20;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTDecember2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverFebruary() {
    if (user.apr05_21 - user.feb19_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="febOver"
          value={user.apr05_21 - user.feb19_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="febOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverFebruaryFees() {
    let x = user.apr05_21 - user.feb19_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2020t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTFebruary2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverApril21() {
    if (user.jun04_21 - user.apr05_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="aprOver"
          value={user.jun04_21 - user.apr05_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="aprOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverAprilFees21() {
    let x = user.jun04_21 - user.apr05_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2021"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2021t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2021t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTApril2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverJune21() {
    if (user.aug04_21 - user.jun04_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="junOver"
          value={user.aug04_21 - user.jun04_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="junOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverJuneFees21() {
    let x = user.aug04_21 - user.jun04_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune2021"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune0421t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTJune0421t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTJune2020"
        value="0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverAugust21() {
    if (user.oct03_21 - user.aug04_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="augOver"
          value={user.oct03_21 - user.aug04_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="augOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverAugustFees21() {
    let x = user.oct03_21 - user.aug04_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTAugust2021"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTAugust0421t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTAugust0421t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTAugust2021"
        value="$0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverOctober21() {
    if (user.dec03_21 - user.oct03_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="octOver"
          value={user.dec03_21 - user.oct03_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="octOver"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverOctoberFees21() {
    let x = user.dec03_21 - user.oct03_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober2021"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober0321t1"
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTOctober0321t2"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTOctober2021"
        value="$0"
        label="results"
        readOnly
      ></input>;
    }
  }

  function galOverDecember21() {
    if (user.feb04_22 - user.dec03_21 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="dec21Over"
          value={user.feb04_22 - user.dec03_21 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="dec21Over"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverDecemberFees21() {
    let x = user.feb04_22 - user.dec03_21;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTDecember2021"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTDecember2021"
          /*chech this one for error*/
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTDecember2021"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTDecember2021"
        value="$0"
        label="results"
        readOnly
      ></input>;
    }
  }

  // ****FEBRUARY******

  function galOverFebruary22() {
    if (user.apr07_22 - user.feb04_22 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="feb22Over"
          value={user.apr07_22 - user.feb04_22 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="feb22Over"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverFebruaryFees22() {
    let x = user.apr07_22 - user.feb04_22;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTFebruary2022"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTFebruary2022"
          /*chech this one for error*/
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTFebruary2022"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTFebruary2022"
        value="$0"
        label="results"
        readOnly
      ></input>;
    }
  }

  // ******APRIL******

  function galOverApril22() {
    if (user.jun07_22 - user.apr07_22 > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="apr22Over"
          value={user.jun07_22 - user.apr07_22 - 6000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="apr22Over"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverAprilFees22() {
    let x = user.jun07_22 - user.apr07_22;
    if (x > 6000 && x < 10000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2022"
          value={"$" + ((x - 6000) * 0.005).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 10000 && x < 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2022"
          /*chech this one for error*/
          value={"$" + ((x - 10000) * 0.01 + 19.99).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else if (x > 20000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="greaterThan"
          id="gTApril2022"
          value={"$" + ((x - 20000) * 0.025 + 19.99 + 99.98).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      <input
        style={{
          backgroundColor: bgColors.Blue,
          margin: "0 10px 0 10px",
          width: "75px",
        }}
        type="text"
        name="greaterThan"
        id="gTApril2022"
        value="$0"
        label="results"
        readOnly
      ></input>;
    }
  }

  // ******JUNE******

  function galOverJune22() {
    if (user.aug05_22 - user.jun07_22 > 8000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="apr22Over"
          value={user.aug05_22 - user.jun07_22 - 8000}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          name="utilized"
          id="apr22Over"
          value="0"
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function yearlyIncluded() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;

    let costFree = 48000;
    let rmn = costFree - a;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ******AUGUST*****

  function afterAugust() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let total2 = a + b;
    let costFree = 48000;
    let rmn = costFree - total2;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ******OCTOBER******

  function afterOctober() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let c = user.dec09_22 - user.oct07_22;
    let total2 = a + b + c;
    let costFree = 48000;
    let rmn = costFree - total2;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ****DECEMBER

  function afterDecember() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let c = user.dec09_22 - user.oct07_22;
    let d = user.feb04_23 - user.dec09_22;
    let total3 = a + b + c + d;
    let costFree = 48000;
    let rmn = costFree - total3;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ***FEBRUARY 2023***

  function afterFebruary() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let c = user.dec09_22 - user.oct07_22;
    let d = user.feb04_23 - user.dec09_22;
    let e = user.apr06_23 - user.feb04_23;
    let total4 = a + b + c + d + e;
    let costFree = 48000;
    let rmn = costFree - total4;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ***April 2023***

  function afterApril() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let c = user.dec09_22 - user.oct07_22;
    let d = user.feb04_23 - user.dec09_22;
    let e = user.apr06_23 - user.feb04_23;
    let f = user.jun05_23 - user.apr06_23;
    let total5 = a + b + c + d + e + f;
    let costFree = 48000;
    let rmn = costFree - total5;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ***June 2023***

  function afterJune23() {
    let g = user.aug02_23 - user.jun05_23;
    let total6 = g;
    let costFree = 6000;
    let rmn = costFree - total6;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  // ***August 2023***

  function afterAugust23() {
    let h = user.oct05_23 - user.aug02_23;
    let total7 = h;
    let costFree = 6000;
    let rmn = costFree - total7;

    if (rmn < 0) {
      return (
        <input
          style={{
            color: "red",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            color: "black",
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="number"
          name="utilized"
          id="yearOver"
          value={rmn}
          label="galOver"
          readOnly
        ></input>
      );
    }
  }

  function galOverFees22() {
    let a = user.aug05_22 - user.jun07_22;
    let b = user.oct07_22 - user.aug05_22;
    let c = user.dec09_22 - user.oct07_22;
    let d = user.feb04_23 - user.dec09_22;
    let e = user.apr6_23 - user.feb04_23;
    let totalYearUsed = a + b + c + d + e;
    let rmn = 48000 - totalYearUsed;

    if (rmn < 0) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTJune2022"
          /*chech this one for error*/
          value={"$" + (rmn * -1 * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
    } else {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTJune2022"
          /*chech this one for error*/
          value={0}
          label="results"
          readOnly
        ></input>
      );
    }
  }

  
  function december2023() {
    let a = user.dec04_23 
    let b = user.oct05_23
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTDecember2023"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gTDecember2023"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }
  function February2024() {
    let a = user.feb02_24 
    let b = user.dec04_23
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTFebruary2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtFebruary2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

  function April2024() {
    let a = user.apr01_24 
    let b = user.feb02_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTApril2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtApril2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }


  function June2024() {
    let a = user.jun01_24 
    let b = user.apr01_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTJune2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtJune2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

  function August2024() {
    let a = user.aug01_24 
    let b = user.jun01_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTAugust2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtAugust2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

  function October2024() {
    let b = user.aug01_24 
    let a = user.oct01_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTOctober2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtOctober2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

function December2024() {
    let a = user.dec01_24 
    let b = user.oct01_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTDecember2024"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtDecember2024"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }



function February2025() {
    let a = user.feb01_25 
    let b = user.dec01_24
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTFebruary2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtFebruary2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

function April2025() {
    let a = user.apr01_25 
    let b = user.feb01_25
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTApril2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtApril2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
  }

function June2025() {
    let a = user.jun01_25 
    let b = user.apr01_25
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTJune2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtJune2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
}

function August2025() {
    let a = user.aug01_25 
    let b = user.jun01_25
    let c = a - b
     
    


    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTAugust2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtAugust2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
}

function October2025() {
    let a = user.oct01_25 
    let b = user.aug01_25
    let c = a - b
     
    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTOctober2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtOctober2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
}

function December2025() {
    let a = user.dec01_25 
    let b = user.oct01_25
    let c = a - b
     
    if (c > 6000) {
      return (
        <input
          style={{
            backgroundColor: bgColors.Blue,
            margin: "0 10px 0 10px",
            width: "75px",
          }}
          type="text"
          display="none"
          name="greaterThan"
          id="gTDecember2025"
          /*chech this one for error*/
          value={"$" + ((c - 6000) * 0.025).toFixed(2)}
          label="results"
          readOnly
        ></input>
      );
      } else {
        return (
          <input
            style={{
              backgroundColor: bgColors.Blue,
              margin: "0 10px 0 10px",
              width: "75px",
            }}
            type="text"
            display="none"
            name="greaterThan"
            id="gtDecember2025"
            /*chech this one for error*/
            value={0}
            label="results"
            readOnly
          ></input>
        );
    }
}
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        width: "100%",
        marginTop: "10px",
        marginLeft: "0px",
        marginBottom: "100px",
        paddingBottom: "50px",
      }}
    >
      
        <div className={styles.title}>
          <h1 className={styles.pageheader}>
            👤 <em>{user.last_name}</em>
          </h1>
        </div>
        <div>
          {/* CUSTOMER INFO TABLE */}
          <table className={styles.table}>
            <thead>
              <tr
                style={{ fontWeight: "900", fontSize: "30" }}
                className={styles.th2}
              >
                <td>
                  <p style={{ fontWeight: "900" }} className={styles.th2}>
                    Mtr Sr Nr
                  </p>
                </td>
                <td>
                  <p style={{ fontWeight: "900" }} className={styles.th2}>
                    #{user.meter_serialNum}
                  </p>
                </td>
              </tr>
            </thead>
          </table>

          {/* START MONTHLY RATES */}
          <table className={styles.monthlyRate}>
            <thead>
              <tr>
                <td className={styles.td3}>
                  <p className={styles.newFee}>Bi Monthly Rates</p>
                </td>
              </tr>

              <tr className={styles.th2}>
                <td className={styles.newFee}>Billing Period</td>
                <td className={styles.newFee}>Gal Used</td>
                <td className={styles.newFee}>
                  Gal Over
                </td>
                <td className={styles.newFee}>
                  Charge/Fee
                </td>
              </tr>
            </thead>
            <tbody>


{/* October 2025 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2025</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/1/25 - 12/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="2025"
                    value={(user.dec01_25 - user.oct01_25 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="Oct2025"
                    value={(6000 - (user.dec01_25 - user.oct01_25))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{December2025()}</td>
                      </tr>

          
          {/* August 2025 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2025</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (08/1/25 - 10/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="2025"
                    value={(user.oct01_25 - user.aug01_25 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="Aug2025"
                    value={(6000 - (user.oct01_25 - user.aug01_25))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{October2025()}</td>
                      </tr>
            
{/* June 2025 */}
            <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Jun 2025</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (06/1/25 - 08/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="2025"
                    value={(user.aug01_25 - user.jun01_25 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="Jun2025"
                    value={(6000 - (user.aug01_25 - user.jun01_25))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{August2025()}</td>
                      </tr>


{/* April 2025 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Apr 2025</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (04/1/25 - 06/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="2025"
                    value={(user.jun01_25 - user.apr01_25 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="April2025"
                    value={(6000 - (user.jun01_25 - user.apr01_25))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{June2025()}</td>
                      </tr>
{/* February 2025 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Feb 2025</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (02/1/25 - 04/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2025"
                    value={(user.apr01_25 - user.feb01_25 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2025"
                    value={(6000 - (user.apr01_25 - user.feb01_25))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{April2025()}</td>
              </tr>
            
          {/* December 2024 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Dec 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (12/1/24 - 02/01/25)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2024"
                    value={(user.feb01_25 - user.dec01_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2024"
                    value={(6000 - (user.feb01_25 - user.dec01_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{February2025()}</td>
              </tr>
          
          
          {/* October 2024 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/1/24) - (12/1/24
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2024"
                    value={(user.dec01_24 - user.oct01_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2024"
                    value={(6000 - (user.dec01_24 - user.oct01_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{December2024()}</td>
              </tr>
          
          {/* August 2024 */}
<tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (8/1/24) - (10/1/24)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2024"
                    value={(user.oct01_24 - user.aug01_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2024"
                    value={(6000 - (user.oct01_24 - user.aug01_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{October2024()}</td>
              </tr>

              {/* June 2024 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Jun 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (6/1/24) - (8/1/24)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="June2024"
                    value={(user.aug01_24 - user.jun01_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="June2024"
                    value={(6000 - (user.aug01_24 - user.jun01_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{August2024()}</td>
              </tr>


              {/* April 2024 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Apr 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (4/1/24) - (6/1/24)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="April2024"
                    value={(user.jun01_24 - user.apr01_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="April2024"
                    value={(6000 - (user.jun01_24 - user.apr01_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{June2024()}</td>
              </tr>



              {/* February 2024 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Feb 2024</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (2/2/24) - (4/1/24)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2023"
                    value={(user.apr01_24 - user.feb02_24 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2024"
                    value={(6000 - (user.apr01_24 - user.feb02_24))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{April2024()}</td>
              </tr>

              {/* December 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Dec 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (12/4/23) - (2/2/24)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2023"
                    value={(user.feb02_24 - user.dec04_23 )}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2023"
                    value={(6000 - (user.feb02_24 - user.dec04_23))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{February2024()}</td>
              </tr>
              {/* OCTOBER 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/5/23) - (12/4/23)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2023"
                    value={(user.dec04_23 - user.oct05_23)}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2023"
                    value={(6000 - (user.dec04_23 - user.oct05_23))*-1}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{december2023()}</td>
              </tr>
              <br></br>
            </tbody>  
          </table>

          {/* START NEW FEE TABLE HEADER */}
          <table>
            <thead>
              <tr>
                <td className={styles.td3}>
                  <p className={styles.newFee}>Special Fee Structure</p>
                </td>
              </tr>

              <tr className={styles.th2}>
                <td className={styles.newFee}>Billing Period</td>
                <td className={styles.newFee}>Gal Used</td>
                <td className={styles.newFee}>
                  Remaining<br></br>(of 6,000)
                </td>
              </tr>
            </thead>

            


            {/* START NEW FEE DATA */}
            <tbody>
              <tr>
                <td>--2023 Special Rates--</td>
              </tr>
              {/* AUGUST 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (8/2/23) - (10/5/23)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2023"
                    value={user.oct05_23 - user.aug02_23}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterAugust23()}</td>
              </tr>

              {/* JUNE 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Jun 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (6/5/23-8/2/23)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2023"
                    value={user.aug02_23 - user.jun05_23}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterJune23()}</td>
              </tr>

              <tr>
                <td>
                  <b>--2022 Numbers--</b>
                </td>
              </tr>

              {/* APRIL 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Apr 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (04/06-06/05)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2023"
                    value={user.jun05_23 - user.apr06_23}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterApril()}</td>
              </tr>

              {/* FEBRUARY 2023 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Feb 2023</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (02/04-04/06)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2023"
                    value={user.apr06_23 - user.feb04_23}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterFebruary()}</td>
              </tr>

              {/* DECEMBER 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Dec 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (12/10-02/04)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2022"
                    value={user.feb04_23 - user.dec09_22}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterDecember()}</td>
              </tr>

              {/* OCTOBER 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/07-12/09)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2022"
                    value={user.dec09_22 - user.oct07_22}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterOctober()}</td>
              </tr>

              {/* AUGUST 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (8/05-10/07)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2022"
                    value={user.oct07_22 - user.aug05_22}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{afterAugust()}</td>
              </tr>

              {/* JUNE 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Jun 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (6/07-8/05)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="June2022"
                    value={user.aug05_22 - user.jun07_22}
                    label="answers"
                  ></input>
                </td>
                <td className={styles.td3}>{yearlyIncluded()}</td>
              </tr>

              {/* YEAR TOTAL */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.yearTotal}>Year Total</p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="yearTotal"
                    value={user.year_total}
                    label="answers"
                    readOnly
                  ></input>
                </td>
              </tr>

              {/* NEW BILLING CHARGES AND FEES */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Charges/Fees</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (6/7/22-6/6/23)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="fees"
                    id="2223"
                    /*chech this one for error*/
                    value={user.fees}
                    label="results"
                    readOnly
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>

          {/* START OLD BILLING TABLE HEADER */}
          <table className={styles.table2}>
            <thead>
              <tr>
                <td className={styles.td3}>
                  <p className={styles.oldFee}>Old Billing Structure</p>
                </td>
              </tr>
              <tr className={styles.th2}>
                <td className={styles.newFee}>Billing Period</td>
                <td className={styles.newFee}>Gal Used</td>
                <td className={styles.newFee}>Gal Over</td>
                <td className={styles.newFee}>Charge/Fee</td>
              </tr>
            </thead>

            {/* OLD BILLING DATA SECTION */}
            <tbody className={styles.tbody}>
              {/* APR 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Apr 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (04/08-6/07)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="April2022"
                    value={user.jun07_22 - user.apr07_22}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverApril22()}</td>
                <td className={styles.td3}>{galOverAprilFees22()}</td>
              </tr>

              {/* FEB 2022 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Feb 2022</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (02/05-4/07)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2022"
                    value={user.apr07_22 - user.feb04_22}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverFebruary22()}</td>
                <td className={styles.td3}>{galOverFebruaryFees22()}</td>
              </tr>

              {/* DEC 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Dec 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (12/03-02/04)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2021"
                    value={user.feb04_22 - user.dec03_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverDecember21()}</td>
                <td className={styles.td3}>{galOverDecemberFees21()}</td>
              </tr>

              {/* OCT 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/03-12/03)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2021"
                    value={user.dec03_21 - user.oct03_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverOctober21()}</td>
                <td className={styles.td3}>{galOverOctoberFees21()}</td>
              </tr>

              {/* AUG 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (08/04-10/03)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2021"
                    value={user.oct03_21 - user.aug04_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverAugust21()}</td>
                <td className={styles.td3}>{galOverAugustFees21()}</td>
              </tr>

              {/* JUN 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Jun 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (06/04-08/04)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="June2021"
                    value={user.aug04_21 - user.jun04_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverJune21()}</td>
                <td className={styles.td3}>{galOverJuneFees21()}</td>
              </tr>

              {/* APR 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Apr 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (04/05-06/04)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="April2021"
                    value={user.jun04_21 - user.apr05_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverApril21()}</td>
                <td className={styles.td3} name="fees">
                  {galOverAprilFees21()}
                </td>
              </tr>

              {/* FEB 2021 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Feb 2021</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (02/20-04/05)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="February2021"
                    value={user.apr05_21 - user.feb19_21}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverFebruary()}</td>
                <td className={styles.td3}>{galOverFebruaryFees()}</td>
              </tr>

              {/* DEC 2020 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Dec 2020</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (12/11-02/19)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="December2020"
                    value={user.feb19_21 - user.dec10_20}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverDecember()}</td>
                <td className={styles.td3}>{galOverDecemberFees()}</td>
              </tr>

              {/* OCT 2020 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Oct 2020</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      padding: 0,
                    }}
                  >
                    (10/07-12/10)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="October2020"
                    value={user.dec10_20 - user.oct07_20}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverOctober()}</td>
                <td className={styles.td3}>{galOverOctoberFees()}</td>
              </tr>

              {/* AUGUST 2020 */}
              <tr>
                <td className={styles.td3}>
                  <p className={styles.p}>Aug 2020</p>
                  <p
                    style={{
                      fontSize: 9,
                      width: "75px",
                      color: "white",
                      margin: "-20px 0 0 10px",
                      paddingTop: "-10px",
                    }}
                  >
                    (08/11-10/07)
                  </p>
                </td>
                <td className={styles.td3}>
                  <input
                    style={{
                      backgroundColor: bgColors.Blue,
                      margin: "0 10px 0 10px",
                      width: "75px",
                    }}
                    type="text"
                    name="utilized"
                    id="August2020"
                    value={user.oct07_20 - user.aug10_20}
                    label="answers"
                    readOnly
                  ></input>
                </td>
                <td className={styles.td3}>{galOverAugust()}</td>
                <td className={styles.td3}>{galOverAugustFees()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BGBlack />
      
    </main>
  );
};

export default User;
