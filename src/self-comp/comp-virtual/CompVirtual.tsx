import React from "react";
import pc from "prefix-classnames";
import BaseLayout from "@/components/BaseLayout";
import VritualList from "@/components/Basic/VirtualList";
import "./CompVirtual.scss";

const px = pc("lyx-website-compvirtual");

const CompVirtual = () => {
  return (
    <BaseLayout className={px("root")} goBack>
      <VritualList
        itemSize={10}
        data={Array.from({ length: 100 }).map((_, index) => index + 1)}
      >
        {(item: number) => {
          return <div className={px("item")}>{item}</div>;
        }}
      </VritualList>
    </BaseLayout>
  );
};

export default CompVirtual;
