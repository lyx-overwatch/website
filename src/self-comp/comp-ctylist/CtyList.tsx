import React from "react";
import pc from 'prefix-classnames';
import BaseLayout from "@/components/BaseLayout";
import CompCtyList from "../components/comp-cty-list";
import './CtyList.less';

const px = pc('lyx-website-ctylist');

const CtyList = () => {
  return (
    <BaseLayout className={px('root')} goBack>
      <CompCtyList></CompCtyList>
    </BaseLayout>
  )
};

export default CtyList;