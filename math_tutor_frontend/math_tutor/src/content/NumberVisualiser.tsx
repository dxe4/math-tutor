import React, { useState, useEffect } from "react";
import apiService from "../services/api";
import NumberVisualizer from "./components/ColoredNumbers";
import useFetchPowerOfTwoToTheTen from "./hooks/useFetchTwoToTheTenAdic";

const NumberVisualizerContainer: React.FC = () => {
  const { data, isLoading, error } = useFetchPowerOfTwoToTheTen();
  return <NumberVisualizer data={data} isLoading={isLoading} error={error} />;
};

export default NumberVisualizerContainer;
