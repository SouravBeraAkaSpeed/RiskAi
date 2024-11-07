import React from "react";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

const TrainModel = () => {
  return (
    <>
      <div className="flex flex-col my-[100px] justify-center items-center w-full border-2 rounded-[20px] lg:mx-[350px] mx-[15px]  shadow-lg shadow-purple-400">
        <div className="flex  m-[30px] text-3xl font-bold  text-center">
          Start training Your Model
        </div>
        <div className="flex items-start flex-col px-10">
          <div className="mb-10">Training will include several Steps :</div>
          <div className="flex  items-start my-1">
            <div className="flex">🟣</div>
            <div className="flex">Extracting data from Bank files</div>
          </div>
          <div className="flex  items-start my-1">
            <div className="flex">🟣</div>
            <div className="flex">Converting Data into Chunks</div>
          </div>
          <div className="flex  items-start my-1">
            <div className="flex">🟣</div>
            <div className="flex">
              Converting Chunks into Vector Embeddings (Actual Training)
            </div>
          </div>
          <div className="flex  items-start my-1">
            <div className="flex">🟣</div>
            <div className="flex">Storing Trained Baises to database</div>
          </div>
        </div>
        <Link href={"/risk-assessment/train-model"}>
          <Button type="button" className="my-10">
            Start Training
          </Button>
        </Link>
        <span className="mb-5 mx-5 text-center md:text-start">
          *This Process will take some time , because of heavy load it can also
          take hours{" "}
        </span>
        <div className="flex px-2 mx-5 text-center md:text-start">
          <Mail />
          <span className="mb-10 mx-2">
            You will be notified with an email when the training is done
          </span>
        </div>
      </div>
    </>
  );
};

export default TrainModel;
