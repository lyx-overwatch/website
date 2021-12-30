import React from "react";
import pc from "prefix-classnames";
import BaseLayout from "@/components/BaseLayout";
import NumberCode from "@/components/Basic/NumberCode";
import "./CompCode.scss";

const px = pc("lyx-website-compcode");

const CompTab = () => {
  return (
    <BaseLayout className={px("root")} goBack>
      <div className={px("container")}>
        <NumberCode
          onChange={(val: string) => {
            console.log(val);
          }}
        ></NumberCode>
      </div>
    </BaseLayout>
  );
};

export default CompTab;
