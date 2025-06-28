import React from "react";
import { db } from "@/fake-db/pages/weights";
import Weights from "@/views/weights";

const WeightsPage = () => {
  return (
    <Weights data={db} />
  )
}

export default WeightsPage