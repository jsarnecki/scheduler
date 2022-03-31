import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";


describe("Appointment", () => {
  afterEach(cleanup);
  it("renders without crashing", () => {
    render(<Application />);
  });
})
 