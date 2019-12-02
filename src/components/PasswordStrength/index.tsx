import * as React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

const Indicator = styled.div`
  height: 20px;
  width: 100%;
  background-color: ${({ color }) => color};
`;

const indicatorMachine = Machine({
  id: "indicator",
  initial: "bad",
  states: {
    bad: {
      on: { GOOD: "good" }
    },
    good: {
      on: { BAD: "bad" }
    }
  }
});

const PasswordStrength = () => {
  //let [color, setColor] = React.useState("#ff0000");
  let [current, send] = useMachine(indicatorMachine);

  const onChange = e => {
    if (e.target.value?.length > 5) {
      send("GOOD");
      return;
    }
    send("BAD");
  };

  return (
    <React.Fragment>
      <label htmlFor="password">
        Password
        <input name="password" id="password" onChange={onChange}></input>
      </label>
      <Indicator color={current.value === "good" ? "#00ff00" : "#ff0000"} />
    </React.Fragment>
  );
};
export default PasswordStrength;
